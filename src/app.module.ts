import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import { InvoiceService } from './invoice/invoice.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { DataSourceOptions } from 'typeorm';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    InvoiceModule,
    CustomerModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
    }),
    TypeOrmModule.forRoot(databaseConfig() as DataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
