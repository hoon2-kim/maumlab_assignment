import { Field, ObjectType } from '@nestjs/graphql';
import { Option } from 'src/apis/options/entities/option.entity';
import { Questionnaire } from 'src/apis/questionnaires/entities/questionnaire.entity';
import { Question } from 'src/apis/questions/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  isCompleted: boolean;

  @ManyToOne(() => Questionnaire)
  @Field(() => Questionnaire)
  questionnaire: Questionnaire;

  @ManyToOne(() => Question)
  @Field(() => Question)
  question: Question;

  @ManyToOne(() => Option)
  @Field(() => Option)
  option: Option;
}
