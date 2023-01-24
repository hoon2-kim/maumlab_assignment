import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from '../options/entities/option.entity';
import { Questionnaire } from '../questionnaires/entities/questionnaire.entity';
import { Question } from '../questions/entities/question.entity';
import { SubmitQuestionnaire } from '../submitQuestionnaires/entities/submitQuestionnaire.entity';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answer, //
      Questionnaire,
      Question,
      Option,
      SubmitQuestionnaire,
    ]),
  ],
  providers: [
    AnswerResolver, //
    AnswerService,
  ],
})
export class AnswerModule {}
