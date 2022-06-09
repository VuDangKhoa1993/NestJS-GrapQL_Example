import { Inject } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CustomerModel } from 'src/customer/customer.model';
import { InvoiceModel } from 'src/invoice/invoice.model';
import { InvoiceService } from 'src/invoice/invoice.service';
import { CustomerDto } from './customer.dto';
import { CustomerService } from './customer.service';

@ObjectType()
class CustomerRO {
  @Field(() => [CustomerModel])
  customers: CustomerModel[];
  @Field()
  count: number;
}

@Resolver((of) => CustomerModel)
export class CustomerResolver {
  constructor(
    @Inject(CustomerService) private customerService: CustomerService,
    @Inject(InvoiceService) private invoiceService: InvoiceService,
  ) {}

  @Query(() => CustomerModel)
  async customer(@Args('id') id: string): Promise<CustomerModel> {
    return await this.customerService.findById(id);
  }

  @ResolveField(() => [InvoiceModel])
  async invoices(@Parent() customer: CustomerModel) {
    const { id } = customer;
    return await this.invoiceService.findByCustomer(id);
  }

  @Query(() => CustomerRO)
  async listCustomers(): Promise<CustomerRO> {
    const [customers, count] = await this.customerService.findAll();
    return { customers, count } as CustomerRO;
  }

  @ResolveField(() => [CustomerModel])
  async customers(@Parent() customerRO: CustomerRO) {
    const { customers } = customerRO;
    return customers;
  }

  @Mutation(() => CustomerModel)
  async createCustomer(
    @Args('customer') customer: CustomerDto,
  ): Promise<CustomerModel> {
    return await this.customerService.create(customer);
  }
}
