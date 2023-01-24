import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Questionnaire } from 'src/apis/questionnaires/entities/questionnaire.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class SubmitQuestionnaire {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  totalPoint: number;

  @Column()
  @Field(() => Boolean)
  isSubmitted: boolean;

  @ManyToOne(() => Questionnaire)
  @Field(() => Questionnaire)
  questionnaire: Questionnaire;

  @JoinColumn()
  @OneToOne(() => User)
  @Field(() => User)
  user: User;
}
