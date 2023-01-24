import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { CreateAnswerInput } from './dto/createAnswer.input';
import { UpdateAnswerInput } from './dto/updateAnswer.input';
import { Answer } from './entities/answer.entity';

@Resolver()
export class AnswerResolver {
  constructor(
    private readonly answerService: AnswerService, //
  ) {}

  @Query(() => [Answer])
  fetchAllAnswer() {
    return this.answerService.findAll();
  }

  @Query(() => Answer)
  fetchOneAnswer(
    @Args('answerId') answerId: string, //
  ) {
    return this.answerService.findOne({ answerId });
  }

  @Mutation(() => Answer)
  submitQuestionnaire(
    @Args('userId') userId: string, //
    @Args('questionnaireId') questionnaireId: string,
  ) {
    return this.answerService.submit({ userId, questionnaireId });
  }

  @Mutation(() => Answer)
  createAnswer(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput, //
    @Args('userId') userId: string,
  ) {
    return this.answerService.create({ createAnswerInput, userId });
  }

  @Mutation(() => Answer)
  updateAnswer(
    @Args('answerId') answerId: string, //
    @Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput,
    @Args('userId') userId: string,
  ) {
    return this.answerService.update({ answerId, updateAnswerInput, userId });
  }

  @Mutation(() => Boolean)
  softDeleteAnswer(
    @Args('answerId') answerId: string, //
  ) {
    return this.answerService.delete({ answerId });
  }
}
