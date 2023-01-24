import { Field, ObjectType } from '@nestjs/graphql';
import { Option } from 'src/apis/options/entities/option.entity';
import { Questionnaire } from 'src/apis/questionnaires/entities/questionnaire.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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
  @Field(() => String)
  contents: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.question)
  @Field(() => Questionnaire)
  questionnaire: Questionnaire;

  @OneToMany(() => Option, (option) => option.question)
  @Field(() => [Option], { nullable: true })
  option: Option[];
}
