import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDto } from './customer.dto';
import { CustomerModel } from './customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerModel)
    private customerRepository: Repository<CustomerModel>,
  ) {}

  public async findById(id: string): Promise<CustomerModel | null> {
    return await this.customerRepository.findOneBy({ id });
  }

  public async findAll(): Promise<[CustomerModel[], number]> {
    return await this.customerRepository.findAndCount();
  }

  public async create(customer: CustomerDto): Promise<CustomerModel> {
    return this.customerRepository.save(customer);
  }
}
