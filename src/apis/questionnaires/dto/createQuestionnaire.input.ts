import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateQuestionnaireInput {
  @IsString()
  @Field(() => String)
  subject: string;

  @IsString()
  @Field(() => String)
  description: string;
}
