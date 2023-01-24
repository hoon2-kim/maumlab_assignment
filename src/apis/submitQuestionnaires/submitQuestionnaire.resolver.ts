import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SubmitQuestionnaire } from './entities/submitQuestionnaire.entity';
import { SubmitQuestionnaireService } from './submitQuestionnaire.service';

@Resolver()
export class SubmitQuestionnaireResolver {
  constructor(
    private readonly submitQuestionnaireService: SubmitQuestionnaireService, //
  ) {}

  @Query(() => [SubmitQuestionnaire])
  fetchAllSubmitQuestionnaire() {
    return this.submitQuestionnaireService.findAll();
  }

  @Query(() => SubmitQuestionnaire)
  fetchOneSubmitQuestionnaire(
    @Args('submintQuestionnaireId') submintQuestionnaireId: string, //
  ) {
    return this.submitQuestionnaireService.findOne({ submintQuestionnaireId });
  }

  @Query(() => [SubmitQuestionnaire])
  fetchUserSubmitQuestionnaire(
    @Args('userId') userId: string, //
  ) {
    return this.submitQuestionnaireService.findUser({ userId });
  }

  @Mutation(() => Boolean)
  softDeleteSubmitQuestionnaire(
    @Args('submintQuestionnaireId') submintQuestionnaireId: string, //
  ) {
    return this.submitQuestionnaireService.delete({ submintQuestionnaireId });
  }
}
