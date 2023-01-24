import { Field, ObjectType } from '@nestjs/graphql';
import { SubmitQuestionnaire } from 'src/apis/submitQuestionnaires/entities/submitQuestionnaire.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToOne(() => SubmitQuestionnaire, { nullable: true })
  @Field(() => SubmitQuestionnaire, { nullable: true })
  submitQestionnaire: SubmitQuestionnaire;
}
