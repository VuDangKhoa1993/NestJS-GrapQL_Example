import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from 'src/customer/customer.module';
import { InvoiceModel } from './invoice.model';
import { InvoiceResolver } from './invoice.resolver';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [
    forwardRef(() => CustomerModule),
    TypeOrmModule.forFeature([InvoiceModel]),
  ],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService],
})
export class InvoiceModule {}
