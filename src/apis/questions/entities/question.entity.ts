import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Questionnaire } from 'src/apis/questionnaires/entities/questionnaire.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  questionNum: number;

  @Column()
  @Field(() => String)
  subject: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deleteddAt: Date;

  @ManyToOne(() => Questionnaire)
  @Field(() => Questionnaire)
  questionnaire: Questionnaire;
}
