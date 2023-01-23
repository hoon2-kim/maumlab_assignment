import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from 'src/apis/questions/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Question)
  @Field(() => Question)
  question: Question;
}
