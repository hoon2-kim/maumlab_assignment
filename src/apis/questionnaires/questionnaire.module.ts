import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionnaire } from './entities/questionnaire.entity';
import { QuestionnaireResolver } from './questionnaire.resolver';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Questionnaire, //
    ]),
  ],
  providers: [
    QuestionnaireResolver, //
    QuestionnaireService,
  ],
})
export class QuestionnaireModule {}
