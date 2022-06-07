import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomerModel } from 'src/customer/customer.model';
import { CustomerService } from 'src/customer/customer.service';
import { InvoiceModel } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Resolver((of) => InvoiceModel)
export class InvoiceResolver {
  constructor(
    @Inject(InvoiceService) private invoiceService: InvoiceService,
    @Inject(CustomerService) private customerService: CustomerService,
  ) {}

  @Query((returns) => InvoiceModel)
  async invoice(@Args('id') id: string): Promise<InvoiceModel> {
    return await this.invoiceService.findById(id);
  }

  @ResolveField((returns) => CustomerModel)
  async customer(@Parent() invoice: InvoiceModel) {
    const { customer } = invoice;
    return this.customerService.findById(customer.id);
  }
}
