import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuestionInput } from './dto/createQuestion.input';
import { UpdateQuestionInput } from './dto/updateQuestion.input';
import { Question } from './entities/question.entity';
import { QuestionService } from './question.service';

@Resolver()
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService, //
  ) {}

  @Query(() => [Question])
  fetchAllQuestion() {
    return this.questionService.findAll();
  }

  @Query(() => Question)
  fetchOneQuestion(
    @Args('questionId') questionId: string, //
  ) {
    return this.questionService.findOne({ questionId });
  }

  @Mutation(() => Question)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput, //
  ) {
    return this.questionService.create({ createQuestionInput });
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('questionId') questionId: string, //
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ) {
    return this.questionService.update({ questionId, updateQuestionInput });
  }

  @Mutation(() => Boolean)
  softDeleteQuestion(
    @Args('questionId') questionId: string, //
  ) {
    return this.questionService.delete({ questionId });
  }
}
