import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../questions/entities/question.entity';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>, //

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  private readonly logger = new Logger('OPTION');

  async findAll() {
    return await this.optionRepository.find({
      relations: ['question'],
    });
  }

  async findOne({ optionId }) {
    const result = await this.optionRepository.findOne({
      where: { id: optionId },
      relations: ['question'],
    });

    if (!result) {
      this.logger.error(`optionId: ${optionId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 문항입니다.');
    }

    return result;
  }

  async create({ createOptionInput }) {
    const { score, questionId, ...options } = createOptionInput;

    const isExist = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!isExist) {
      this.logger.error(`questionId: ${questionId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 문항입니다.');
    }

    const optionInfo = await this.optionRepository
      .createQueryBuilder('Option')
      .where('Option.question = :questionId', { questionId })
      .getMany();

    const duplicateOption = optionInfo.filter(
      (e) => e.optionNum === createOptionInput.optionNum,
    );
    const duplicateContents = optionInfo.filter(
      (e) => e.contents === createOptionInput.contents,
    );

    if (duplicateOption.length > 0) {
      this.logger.error(
        `optionNum: ${createOptionInput.optionNum}가 중복입니다.`,
      );
      throw new UnprocessableEntityException('중복된 선택지 번호 입니다.');
    }

    if (duplicateContents.length > 0) {
      this.logger.error(
        `contents: ${createOptionInput.contents}가 중복입니다.`,
      );
      throw new UnprocessableEntityException('중복된 선택지 내용 입니다.');
    }

    return await this.optionRepository.save({
      ...options,
      score: score ? score : createOptionInput.optionNum,
      question: questionId,
    });
  }

  async update({ optionId, updateOptionInput }) {
    const isExist = await this.optionRepository.findOne({
      where: { id: optionId },
    });

    if (!isExist) {
      this.logger.error(`optionId: ${optionId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 문항입니다.');
    }

    const optionInfo = await this.optionRepository.findOne({
      where: { question: isExist.question },
    });

    if (optionInfo.optionNum === updateOptionInput.optionNum) {
      this.logger.error(
        `optionNum: ${updateOptionInput.optionNum}가 중복입니다.`,
      );
      throw new UnprocessableEntityException('중복되는 선택지 번호입니다.');
    }

    if (optionInfo.contents === updateOptionInput.contents) {
      this.logger.error(
        `contents: ${updateOptionInput.contents}가 중복입니다.`,
      );
      throw new UnprocessableEntityException('중복되는 선택지 내용입니다.');
    }

    const result = Object.assign({}, isExist, updateOptionInput);

    return await this.optionRepository.save(result);
  }

  async delete({ optionId }) {
    const isExist = await this.optionRepository.findOne({
      where: { id: optionId },
    });

    if (!isExist) {
      this.logger.error(`optionId: ${optionId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 문항입니다.');
    }

    const result = await this.optionRepository.softDelete({ id: optionId });

    return result.affected ? true : false;
  }
}
