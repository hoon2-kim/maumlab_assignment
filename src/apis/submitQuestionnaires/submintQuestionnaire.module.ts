import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitQuestionnaire } from './entities/submitQuestionnaire.entity';
import { SubmitQuestionnaireResolver } from './submitQuestionnaire.resolver';
import { SubmitQuestionnaireService } from './submitQuestionnaire.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubmitQuestionnaire, //
    ]),
  ],
  providers: [
    SubmitQuestionnaireResolver, //
    SubmitQuestionnaireService,
  ],
})
export class SubmitQuestionnaireModule {}
