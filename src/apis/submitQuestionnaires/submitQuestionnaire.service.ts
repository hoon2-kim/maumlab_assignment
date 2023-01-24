import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmitQuestionnaire } from './entities/submitQuestionnaire.entity';

@Injectable()
export class SubmitQuestionnaireService {
  constructor(
    @InjectRepository(SubmitQuestionnaire)
    private readonly submitQuestionnaireRepository: Repository<SubmitQuestionnaire>, //
  ) {}
  private readonly logger = new Logger('SUBMITQUESTIONNAIRE');

  async findAll() {
    return await this.submitQuestionnaireRepository.find({
      relations: ['questionnaire', 'user'],
    });
  }

  async findOne({ submintQuestionnaireId }) {
    const result = await this.submitQuestionnaireRepository.findOne({
      where: { id: submintQuestionnaireId },
      relations: ['questionnaire', 'user'],
    });

    if (!result) {
      this.logger.error(
        `submintQuestionnaireId: ${submintQuestionnaireId}가 존재하지 않습니다.`,
      );
      throw new UnprocessableEntityException('제출되지 않은 설문지 입니다.');
    }

    return result;
  }

  async findUser({ userId }) {
    const result = await this.submitQuestionnaireRepository.findOne({
      where: { user: { id: userId } },
      relations: ['questionnaire', 'user'],
    });

    if (!result) {
      this.logger.error(`userId: ${userId}가 제출한 설문지가 없습니다.`);
      throw new UnprocessableEntityException(
        '해당 유저가 완료한 설문지가 없습니다.',
      );
    }
  }

  async delete({ submintQuestionnaireId }) {
    const isExist = await this.submitQuestionnaireRepository.findOne({
      where: { id: submintQuestionnaireId },
    });

    if (!isExist) {
      this.logger.error(
        `submintQuestionnaireId: ${submintQuestionnaireId}가 존재하지 않습니다.`,
      );
      throw new UnprocessableEntityException(
        '해당 완료 설문지가 존재하지 않습니다.',
      );
    }

    const result = await this.submitQuestionnaireRepository.softDelete({
      id: submintQuestionnaireId,
    });

    return result.affected ? true : false;
  }
}
