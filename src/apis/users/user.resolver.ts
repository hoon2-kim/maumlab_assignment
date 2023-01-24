import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Query(() => [User])
  fetchAllUser() {
    return this.userService.findAll();
  }

  @Query(() => User)
  fetchOneUser(
    @Args('userId') userId: string, //
  ) {
    return this.userService.findOne({ userId });
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    return this.userService.create({ createUserInput });
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string, //
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update({ userId, updateUserInput });
  }

  @Mutation(() => Boolean)
  softDeleteUser(
    @Args('userId') userId: string, //
  ) {
    return this.userService.delete({ userId });
  }
}
