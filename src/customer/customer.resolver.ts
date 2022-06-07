import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CustomerModel } from 'src/customer/customer.model';
import { InvoiceModel } from 'src/invoice/invoice.model';
import { InvoiceService } from 'src/invoice/invoice.service';
import { CustomerService } from './customer.service';

@Resolver((of) => CustomerModel)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(InvoiceService) private invoiceService: InvoiceService,
  ) {}

  @Query((returns) => CustomerModel)
  async customer(@Args('id') id: string): Promise<CustomerModel> {
    return await this.customerService.findById(id);
  }

  @ResolveField((returns) => [InvoiceModel])
  async invoices(@Parent() customer: CustomerModel) {
    const { id } = customer;
    return await this.invoiceService.findByCustomer(id);
  }

  @Query((returns) => [CustomerModel])
  async customers(): Promise<CustomerModel[]> {
    return await this.customerService.findAll();
  }
}

type CustomerRO = {
  customers: CustomerModel[];
  count: number;
};
