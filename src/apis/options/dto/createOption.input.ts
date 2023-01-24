import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateOptionInput {
  @IsInt()
  @Min(1)
  @Max(10)
  @Field(() => Int)
  optionNum: number;

  @IsString()
  @Field(() => String)
  contents: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int, { nullable: true })
  score: number;

  @IsString()
  @Field(() => String)
  questionId: string;
}
