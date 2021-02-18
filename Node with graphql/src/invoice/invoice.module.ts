import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { InvoiceResolver } from './invoice.resolver';
import { Invoice } from './invoice.entity';
import { InvoiceService } from '../shared/service/invoice.service';

const providers = [
    InvoiceResolver,
    InvoiceService
];

@Module({
    imports: [
        TypeOrmModule.forFeature([Invoice]),
        SharedModule
    ],
    providers: providers,
    exports: providers,
})

export class InvoiceModule {
    static forRoot(): DynamicModule {
        return {
            module: InvoiceModule,
        };
    }
}