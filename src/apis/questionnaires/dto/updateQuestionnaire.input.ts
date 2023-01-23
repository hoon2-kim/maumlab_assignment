import { InputType, PartialType } from '@nestjs/graphql';
import { CreateQuestionnaireInput } from './createQuestionnaire.input';

@InputType()
export class UpdateQuestionnaireInput extends PartialType(
  CreateQuestionnaireInput,
) {}
