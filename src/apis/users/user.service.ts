import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //
  ) {}
  private readonly logger = new Logger('USER');

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ userId }) {
    const result = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!result) {
      this.logger.error(`userId: ${userId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다.');
    }

    return result;
  }

  async create({ createUserInput }) {
    const { email } = createUserInput;

    const existEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (existEmail) {
      this.logger.error(`email: ${email}가 이미 존재합니다.`);
      throw new UnprocessableEntityException('이미 존재하는 이메일 입니다.');
    }

    return await this.userRepository.save({
      ...createUserInput,
    });
  }

  async update({ userId, updateUserInput }) {
    const existUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!existUser) {
      this.logger.error(`userId: ${userId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다.');
    }

    const findEmail = await this.userRepository.findOne({
      where: { email: updateUserInput.email },
    });

    if (findEmail) {
      this.logger.error(`email: ${updateUserInput.email}가 이미 존재합니다.`);
      throw new UnprocessableEntityException('이미 존재하는 이메일 입니다.');
    }

    return await this.userRepository.save({
      ...existUser,
      id: userId,
      ...updateUserInput,
    });
  }

  async delete({ userId }) {
    const existUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!existUser) {
      this.logger.error(`userId: ${userId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 유저 입니다.');
    }

    const result = await this.userRepository.softDelete({ id: userId });

    return result.affected ? true : false;
  }
}
