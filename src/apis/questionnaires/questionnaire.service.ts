import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './entities/questionnaire.entity';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>, //
  ) {}
  private readonly logger = new Logger('QUESTIONNAIRE');

  async findAll() {
    return await this.questionnaireRepository.find({
      relations: ['question'],
    });
  }

  async findOne({ questionnaireId }) {
    const result = await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
      relations: ['question'],
    });

    if (!result) {
      this.logger.error(
        `questionnaireId: ${questionnaireId}가 존재하지 않습니다.`,
      );
      throw new UnprocessableEntityException('존재하지 않는 설문지 입니다.');
    }

    return result;
  }

  async create({ createQuestionnaireInput }) {
    const isExist = await this.questionnaireRepository.findOne({
      where: { subject: createQuestionnaireInput.subject },
    });

    if (isExist) {
      this.logger.error(`questionnaireId: ${isExist.id}가 이미 존재 합니다.`);
      throw new UnprocessableEntityException('이미 존재하는 설문지 입니다.');
    }

    return await this.questionnaireRepository.save({
      ...createQuestionnaireInput,
    });
  }

  async update({ questionnaireId, updateQuestionnaireInput }) {
    const isExist = await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
    });

    if (!isExist) {
      this.logger.error(
        `questionnaireId: ${questionnaireId}가 존재하지 않습니다.`,
      );
      throw new UnprocessableEntityException(
        '해당 설문지가 존재하지 않습니다.',
      );
    }

    if (isExist.subject === updateQuestionnaireInput?.subject) {
      this.logger.error(`subject: ${isExist.subject}가 중복됩니다.`);
      throw new UnprocessableEntityException('중복되는 설문지 제목 입니다.');
    }

    if (isExist.description === updateQuestionnaireInput?.description) {
      this.logger.error(`contents: ${isExist.description}가 중복됩니다.`);
      throw new UnprocessableEntityException('중복되는 설문지 설명 입니다.');
    }

    const result = Object.assign({}, isExist, updateQuestionnaireInput);

    return await this.questionnaireRepository.save(result);
  }

  async delete({ questionnaireId }) {
    const isExist = await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
    });

    if (!isExist) {
      this.logger.error(
        `questionnaireId: ${questionnaireId}가 존재하지 않습니다.`,
      );
      throw new UnprocessableEntityException('존재하지 않는 설문지 입니다.');
    }

    const result = await this.questionnaireRepository.softDelete({
      id: questionnaireId,
    });

    return result.affected ? true : false;
  }
}
