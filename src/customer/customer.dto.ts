import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomerDto {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  phone: string;
  @Field()
  address: string;
}
