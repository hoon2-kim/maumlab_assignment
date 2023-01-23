import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuestionnaireInput } from './dto/createQuestionnaire.input';
import { UpdateQuestionnaireInput } from './dto/updateQuestionnaire.input';
import { Questionnaire } from './entities/questionnaire.entity';
import { QuestionnaireService } from './questionnaire.service';

@Resolver()
export class QuestionnaireResolver {
  constructor(
    private readonly questionnaireService: QuestionnaireService, //
  ) {}

  @Query(() => [Questionnaire])
  fetchAllQuestionnaire() {
    return this.questionnaireService.findAll();
  }

  @Query(() => Questionnaire)
  fetchOneQuestionnaire(
    @Args('questionnaireId') questionnaireId: string, //
  ) {
    return this.questionnaireService.findOne({ questionnaireId });
  }

  @Mutation(() => Questionnaire)
  createQuestionnaire(
    @Args('createQuestionnaireInput')
    createQuestionnaireInput: CreateQuestionnaireInput, //
  ) {
    return this.questionnaireService.create({ createQuestionnaireInput });
  }

  @Mutation(() => Questionnaire)
  updateQuestionnaire(
    @Args('questionnaireId') questionnaireId: string, //
    @Args('updateQuestionnaireInput')
    updateQuestionnaireInput: UpdateQuestionnaireInput,
  ) {
    return this.questionnaireService.update({
      questionnaireId,
      updateQuestionnaireInput,
    });
  }

  @Mutation(() => Boolean)
  softDeleteQuestionnaire(
    @Args('questionnaireId') questionnaireId: string, //
  ) {
    return this.questionnaireService.delete({ questionnaireId });
  }
}
