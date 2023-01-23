import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionnaireService } from '../questionnaires/questionnaire.service';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>, //

    private readonly questionnaireService: QuestionnaireService,
  ) {}

  async findAll() {
    const result = await this.questionRepository.findAndCount();

    return {
      data: result[0],
      count: result[1],
    };
  }

  async findOne({ questionId }) {
    const isExist = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!isExist) {
      throw new UnprocessableEntityException('존재하지 않는 문항입니다.');
    }

    return isExist;
  }

  async create({ createQuestionInput }) {
    const existQuestionnaire = await this.questionnaireService.findOne({
      questionnaireId: createQuestionInput.questionnaireId,
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
