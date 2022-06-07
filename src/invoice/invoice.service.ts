import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerModel } from 'src/customer/customer.model';
import { CustomerService } from 'src/customer/customer.service';
import { Repository } from 'typeorm';
import { InvoiceModel } from './invoice.model';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceModel)
    private invoiceRepository: Repository<InvoiceModel>,
    private customerService: CustomerService,
  ) {}

  public findByCustomer(id: string): Promise<InvoiceModel[] | null> {
    return this.invoiceRepository.find({ where: { customer: { id } } });
  }

  public findById(id: string): Promise<InvoiceModel | null> {
    return this.invoiceRepository.findOne({ where: { id } });
  }
}
