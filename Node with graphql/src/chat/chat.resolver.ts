import { Resolver, Query, Args, Mutation, Subscription } from '@nestjs/graphql';
import { Message } from './message.entity';
import { Pagination, PaginationResponse } from '../common/class';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, SelectQueryBuilder, createQueryBuilder } from 'typeorm';
import { UseGuards, Inject } from '@nestjs/common';
import { ApiAuthGuard, CurrentUser } from '../common/modules/auth';
import { User } from '../user/user.entity';
import { UserContact } from './user-contact.entity';
import { PubSub } from 'graphql-subscriptions';
import * as _ from 'underscore';

@Resolver('Chat')
export class ChatResolver {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserContact)
        private readonly contactRepository: Repository<UserContact>,
        @Inject('PUB_SUB')
        private readonly pubSub: PubSub
    ) {
    }

    @Query(() => UserContact)
    @UseGuards(ApiAuthGuard)
    async getContacts(@CurrentUser() user: User){

        let query: SelectQueryBuilder<any> = createQueryBuilder()
            .from('UserContact', 'UserContact')
            .where('user_id = :user_id', { user_id: user._id })
            .addSelect('*')
            .addSelect((qb) => {
                qb.select("created_at").from(Message, 'Message')
                    .where(`Message.contact_id IN (UserContact.contact_id, '${user._id}') AND Message.user_id IN (UserContact.contact_id, '${user._id}') `)
                    .orderBy('created_at', 'DESC')
                    .take(1)
                    .skip(0)
                return qb;
            }, 'last_message_at')
            .addSelect((qb) => {
                qb.select("message").from(Message, 'Message')
                    .where(`Message.contact_id IN (UserContact.contact_id, '${user._id}') AND Message.user_id IN (UserContact.contact_id, '${user._id}') `)
                    .orderBy('created_at', 'DESC')
                    .take(1)
                    .skip(0)
                return qb;
            }, 'last_message_body')
            .orderBy('last_message_at', 'DESC');

        let contacts = await query.getRawMany();
 
        const ids = _.pluck(contacts, 'contact_id');
        ids.push(user._id);
      
        let users = await this.userRepository.find({ where: { '_id': In(ids) } });

        users = _.indexBy(users, '_id');
        contacts = _.map(contacts, (contact) => {
            contact.last_message = {
                'created_at': contact.last_message_at,
                'message': contact.last_message_body
            }
            contact.user = users[contact.user_id];
            contact.contact = users[contact.contact_id];
            return contact;
        })

        return contacts;
    }

    @Query(() => UserContact)
    @UseGuards(ApiAuthGuard)
    async getContact(@CurrentUser() user: User, @Args('input') input: any): Promise<UserContact[]> {
        let contacts = await this.contactRepository.find({ where: { user_id: user._id, contact_id: input._id }, relations: ['contact'] });
        return contacts
    }

    @Query(() => Message)
    @UseGuards(ApiAuthGuard)
    async getMessages(@CurrentUser() user: User, @Args('input') input?: any): Promise<PaginationResponse<Message>> {
        let query = this.messageRepository.createQueryBuilder().where({
            contact_id: In([input.user_id, user._id]),
            user_id: In([input.user_id, user._id]),
        }).orderBy('created_at', 'DESC');

        let data = await new Pagination<Message>(query, Message).paginate(input.limit || 30, input.page || 0);

        return data;
    }

    @Mutation(() => Message)
    @UseGuards(ApiAuthGuard)
    async markAsRead(@CurrentUser() user: User, @Args('user_id') user_id?: any): Promise<UserContact> {
        
        await this.contactRepository.update(
            { user_id: user._id, contact_id: user_id },
            { unread: 0 }
        );

        let contact = await this.contactRepository.findOne({ user_id: user_id, contact_id: user._id });

        this.pubSub.publish('messageRead', { contact: contact })
        return contact;
    }

    @Mutation(() => Message)
    @UseGuards(ApiAuthGuard)
    async addMessage(@CurrentUser() user: User, @Args('input') input: any) {

        //await this.addContact(user, { user_id: input.user_id });
        let contact = await this.contactRepository.findOne({ user_id: input.user_id, contact_id: user._id });
        if (!contact || !contact._id) {
            await this.contactRepository.save({
                user_id: input.user_id,
                contact_id: user._id,
                unread: 0
            });
        }

        let message = await this.messageRepository.save(new Message({
            user_id: user._id,
            contact_id: input.user_id,
            message: input.message
        }));

        if (contact && contact.unread) {
            await this.contactRepository.update(
                { user_id: input.user_id, contact_id: user._id },
                { unread: contact.unread + 1 }
            );
        }
        
        this.pubSub.publish('messageAdded', { messageAdded: message })
        return message
    }

    @Mutation(() => UserContact)
    @UseGuards(ApiAuthGuard)
    async addContact(@CurrentUser() user: User, @Args('input') input: any) {
        let contact = await this.contactRepository.findOne({ user_id: user._id, contact_id: input.user_id }, { relations: ['contact'] });
        if (!contact || !contact._id) {
            /* await this.contactRepository.save({
                user_id: input.user_id,
                contact_id: user._id,
            }) */

            contact = await this.contactRepository.save({
                user_id: user._id,
                contact_id: input.user_id,
                status: 'active'
            })

            contact = await this.contactRepository.findOne({ user_id: user._id, contact_id: input.user_id }, { relations: ['contact'] });
        }
        return { ...contact, last_message: {} }
    }

    @Subscription('messageAdded', {
        filter: (payload, variables, context: any) => {
            //console.log('messageAdded', { payload: payload.messageAdded, context : context.context});
            return payload.messageAdded.contact_id == context.context.user._id
        },
    })
    messageAdded() {
        return this.pubSub.asyncIterator('messageAdded');
    }

    @Subscription('messageTyping', {
        filter: (payload, variables, context: any) => {
            return payload.messageTyping.contact_id == context.context.user._id
        },
    })
    messageTyping() {
        return this.pubSub.asyncIterator('messageTyping');
    }
    
    @Subscription('messageRead', {
        filter: (payload, variables, context: any) => {
            return payload.contact.contact_id == context.context.user._id
        },
    })
    messageRead() {
        return this.pubSub.asyncIterator('messageRead');
    }
}