import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from '../questionnaires/entities/questionnaire.entity';
import { Question } from './entities/question.entity';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question, //
      Questionnaire,
    ]),
  ],
  providers: [
    QuestionResolver, //
    QuestionService,
  ],
})
export class QuestionModule {}
