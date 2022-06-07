import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerModel } from './customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerModel)
    private customerRepository: Repository<CustomerModel>,
  ) {}

  public findById(id: string): Promise<CustomerModel | null> {
    return this.customerRepository.findOne({ where: { id: id } });
  }

  public async findAll(): Promise<CustomerModel[]> {
    const [customers, count] = await this.customerRepository.findAndCount();
    return customers;
  }
}
