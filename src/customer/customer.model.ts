import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InvoiceModel } from '../invoice/invoice.model';

@ObjectType()
@Entity()
export class CustomerModel {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field()
  @Column({ length: 500, nullable: false })
  email: string;

  @Field()
  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Field()
  @Column('text')
  address: string;

  @Field((type) => [InvoiceModel], { nullable: true })
  @OneToMany((type) => InvoiceModel, (invoice) => invoice.customer)
  invoices: InvoiceModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
