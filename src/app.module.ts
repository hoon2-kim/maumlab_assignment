import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from './apis/answers/answer.module';
import { OptionModule } from './apis/options/option.module';
import { QuestionnaireModule } from './apis/questionnaires/questionnaire.module';
import { QuestionModule } from './apis/questions/question.module';
import { SubmitQuestionnaireModule } from './apis/submitQuestionnaires/submintQuestionnaire.module';
import { UserModule } from './apis/users/user.module';

@Module({
  imports: [
    QuestionnaireModule,
    QuestionModule,
    OptionModule,
    AnswerModule,
    UserModule,
    SubmitQuestionnaireModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      logging: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
