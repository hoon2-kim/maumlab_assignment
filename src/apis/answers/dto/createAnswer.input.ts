import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @IsString()
  @Field(() => String)
  questionnaireId: string;

  @IsString()
  @Field(() => String)
  choiceQuestionId: string;

  @IsString()
  @Field(() => String)
  choiceOptionId: string;
}
