import { Field, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/apis/questions/entities/question.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Questionnaire {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar' })
  @Field(() => String)
  subject: string;

  @Column()
  @Field(() => String)
  description: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deleteddAt: Date;

  @OneToMany(() => Question, (question) => question.questionnaire)
  @Field(() => Question)
  question: Question[];
}
