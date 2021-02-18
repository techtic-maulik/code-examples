import { Resolver, Query, Args } from '@nestjs/graphql';
import { PaginationResponse } from '../common/class';
import { Invoice } from './invoice.entity';
import { InvoiceService } from '../shared/service/invoice.service';
import { CurrentUser, ApiAuthGuard } from '../common/modules/auth';
import { UseGuards } from '@nestjs/common';

@Resolver('Invoice')
export class InvoiceResolver {
    constructor(
        private readonly invoiceService: InvoiceService
    ) { }

    @Query(() => Invoice)
    @UseGuards(ApiAuthGuard)
    async getByUser(@Args('input') input, @CurrentUser() user) {
        return await this.invoiceService.getByUser(user._id, input);
    }
    
    @Query(() => Invoice)
    @UseGuards(ApiAuthGuard)
    async getAllInvoices(@Args('input') input) {
        return await this.invoiceService.getAllInvoices(input).then((data) => {
            return data;
        });
    }


    @Query(() => Invoice)
    @UseGuards(ApiAuthGuard)
    async createInvoice() {
        let data = {
            transaction: {
                description: 'demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake  invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice demo Stake invoice ',
                amount: 20,
                _id:'14c024ff-1df9-4dca-848b-48328f0affd1'
            },
            user_id: '5082e40d-5d97-43c5-ba02-059d5aa0d0b3',
            post_id: '872ae50b-8e95-4512-8cb8-f62dc15efe80',
            
        }
        return await this.invoiceService.createInvoice(data);
    }

    
}