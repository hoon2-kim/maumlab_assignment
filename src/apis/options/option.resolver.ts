import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOptionInput } from './dto/createOption.input';
import { UpdateOptionInput } from './dto/updateOption.input';
import { Option } from './entities/option.entity';
import { OptionService } from './option.service';

@Resolver()
export class OptionResolver {
  constructor(
    private readonly optionService: OptionService, //
  ) {}

  @Query(() => [Option])
  fetchAllOption() {
    return this.optionService.findAll();
  }

  @Query(() => Option)
  fetchOneOption(
    @Args('optionId') optionId: string, //
  ) {
    return this.optionService.findOne({ optionId });
  }

  @Mutation(() => Option)
  createOption(
    @Args('createOptionInput') createOptionInput: CreateOptionInput, //
  ) {
    return this.optionService.create({ createOptionInput });
  }

  @Mutation(() => Option)
  updateOption(
    @Args('optionId') optionId: string, //
    @Args('updateOptionInput') updateOptionInput: UpdateOptionInput,
  ) {
    return this.optionService.update({ optionId, updateOptionInput });
  }

  @Mutation(() => Boolean)
  softDeleteOption(
    @Args('optionId') optionId: string, //
  ) {
    return this.optionService.delete({ optionId });
  }
}
