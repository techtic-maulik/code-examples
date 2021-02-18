import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatResolver } from './chat.resolver';
import { Message } from './message.entity';
import { UserContact } from './user-contact.entity';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../user/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Message, UserContact, User]),
    ],
    providers : [
        ChatResolver,
        {
            provide: 'PUB_SUB',
            useValue: new PubSub(),
        }

    ]
})
export class ChatModule {}
