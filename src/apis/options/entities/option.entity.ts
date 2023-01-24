import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/apis/questions/entities/question.entity';
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
export class Option {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  optionNum: number;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => Int, { nullable: true })
  score: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Question, (question) => question.option)
  @Field(() => Question)
  question: Question;
}
