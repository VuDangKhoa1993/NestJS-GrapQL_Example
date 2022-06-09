import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CustomerModel } from 'src/customer/customer.model';
import { CustomerService } from 'src/customer/customer.service';
import { InvoiceDTO } from './invoice.dto';
import { InvoiceModel } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Resolver((of) => InvoiceModel)
export class InvoiceResolver {
  constructor(
    @Inject(InvoiceService) private invoiceService: InvoiceService,
    @Inject(CustomerService) private customerService: CustomerService,
  ) {}

  @Query(() => InvoiceModel)
  async invoice(@Args('id') id: string): Promise<InvoiceModel> {
    return await this.invoiceService.findById(id);
  }

  @ResolveField(() => CustomerModel)
  async customer(@Parent() invoice: InvoiceModel) {
    const { customer } = invoice;
    return await this.customerService.findById(customer.id);
  }

  @Mutation(() => InvoiceModel)
  async createInvoice(
    @Args('invoice') invoice: InvoiceDTO,
  ): Promise<InvoiceModel> {
    return await this.invoiceService.create(invoice);
  }
}
