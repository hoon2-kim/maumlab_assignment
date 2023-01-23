import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @IsString()
  @Field(() => String)
  questionnaireId: string;

  @IsString()
  @Field(() => String)
  subject: string;

  @IsString()
  @Field(() => String)
  description: string;
}
