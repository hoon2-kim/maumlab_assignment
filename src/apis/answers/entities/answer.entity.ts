import { Field, ObjectType } from '@nestjs/graphql';
import { Option } from 'src/apis/options/entities/option.entity';
import { Questionnaire } from 'src/apis/questionnaires/entities/questionnaire.entity';
import { Question } from 'src/apis/questions/entities/question.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Questionnaire)
  @Field(() => Questionnaire)
  questionnaire: Questionnaire;

  @JoinColumn()
  @OneToOne(() => Question)
  @Field(() => Question)
  question: Question;

  @JoinColumn()
  @OneToOne(() => Option)
  @Field(() => Option)
  option: Option;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
