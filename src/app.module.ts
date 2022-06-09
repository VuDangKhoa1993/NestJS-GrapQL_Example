import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { DataSourceOptions } from 'typeorm';
import { ApolloDriver } from '@nestjs/apollo';
import { loadAppConfig } from './config/app.config';
import * as LogRocket from 'logrocket';
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
export class AppModule {
  constructor() {
    console.log(LogRocket);
    LogRocket.init('vdwce2/nestjs-with-graphql');
    LogRocket.identify(loadAppConfig().USER_APP_ID, {
      name: 'khoavu',
      email: 'dangkhoavu1993@gmnail.com',
      subscriptionType: 'pro',
    });
  }
}
