import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { Repository } from 'typeorm';
import { InvoiceDTO } from './invoice.dto';
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

  public async create(invoiceDto: InvoiceDTO): Promise<InvoiceModel> {
    const customerId = invoiceDto.customer;
    const customer = await this.customerService.findById(customerId);
    const subTotal = invoiceDto.items.reduce((acc, curr) => {
      return acc + Number((curr.rate * curr.quantity).toFixed(2));
    }, 0);
    const taxAmount = subTotal * Number((invoiceDto.taxRate / 100).toFixed(2));
    const total = subTotal + taxAmount;
    const outstandingBalance = total;
    return this.invoiceRepository.save({
      ...invoiceDto,
      customer,
      subTotal,
      taxAmount,
      total,
      outstandingBalance,
    } as any);
  }
}
