import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from './entities/questionnaire.entity';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
  ) {}

  async findAll() {
    const result = await this.questionnaireRepository.findAndCount();

    return {
      data: result[0],
      count: result[1],
    };
  }

  async findOne({ questionnaireId }) {
    const isExist = await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
    });

    if (!isExist) {
      throw new UnprocessableEntityException('존재하지 않는 설문지 입니다.');
    }

    return isExist;
  }

  async create({ createQuestionnaireInput }) {
    const isExist = await this.questionnaireRepository.findOne({
      where: { subject: createQuestionnaireInput.subject },
    });

    if (isExist) {
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
      throw new UnprocessableEntityException(
        '해당 설문지가 존재하지 않습니다.',
      );
    }

    const existSubjectOrDescription =
      await this.questionnaireRepository.findOne({
        where: [
          { subject: updateQuestionnaireInput.subject },
          { description: updateQuestionnaireInput.description },
        ],
      });

    if (
      existSubjectOrDescription.subject &&
      existSubjectOrDescription.id !== questionnaireId
    ) {
      throw new UnprocessableEntityException('중복되는 설문지 제목 입니다.');
    }

    if (
      existSubjectOrDescription.description &&
      existSubjectOrDescription.id !== questionnaireId
    ) {
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
      throw new UnprocessableEntityException('존재하지 설문지 입니다.');
    }

    const result = await this.questionnaireRepository.softDelete({
      id: questionnaireId,
    });

    return result.affected ? true : false;
  }
}
