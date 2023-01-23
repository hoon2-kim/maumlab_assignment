import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'configs/typeorm.config';
import { AnswerModule } from './apis/answers/answer.module';
import { OptionModule } from './apis/options/option.module';
import { QuestionnaireModule } from './apis/questionnaires/questionnaire.module';
import { QuestionModule } from './apis/questions/question.module';

@Module({
  imports: [
    QuestionnaireModule,
    QuestionModule,
    OptionModule,
    AnswerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
})
export class AppModule {}
