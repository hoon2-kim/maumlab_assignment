import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questionnaire } from '../questionnaires/entities/questionnaire.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>, //

    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,
  ) {}

  async findAll() {
    return await this.questionRepository.find({
      relations: ['questionnaire', 'option'],
    });
  }

  async findOne({ questionId }) {
    const result = await this.questionRepository.findOne({
      where: { id: questionId },
      relations: ['questionnaire', 'option'],
    });

    if (!result) {
      throw new UnprocessableEntityException('존재하지 않는 문항입니다.');
    }

    return result;
  }

  async create({ createQuestionInput }) {
    const existQuestionnaire = await this.questionnaireRepository.findOne({
      where: { id: createQuestionInput.questionnaireId },
    });

    if (!existQuestionnaire) {
      throw new UnprocessableEntityException('존재하지 않는 설문지 입니다.');
    }

    return await this.questionRepository.save({
      ...createQuestionInput,
      questionnaire: createQuestionInput.questionnaireId,
    });
  }

  async update({ questionId, updateQuestionInput }) {
    const isExist = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!isExist) {
      throw new UnprocessableEntityException('존재하지 않는 문항입니다.');
    }

    const result = Object.assign({}, isExist, updateQuestionInput);

    return await this.questionRepository.save(result);
  }

  async delete({ questionId }) {
    const isExist = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!isExist) {
      throw new UnprocessableEntityException('존재하지 않는 문항입니다.');
    }

    const result = await this.questionRepository.softDelete({ id: questionId });

    return result.affected ? true : false;
  }
}
