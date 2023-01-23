import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOptionInput } from './createOption.input';

@InputType()
export class UpdateOptionInput extends PartialType(CreateOptionInput) {}
