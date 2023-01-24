import {
  ConflictException,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from '../options/entities/option.entity';
import { Questionnaire } from '../questionnaires/entities/questionnaire.entity';
import { Question } from '../questions/entities/question.entity';
import { SubmitQuestionnaire } from '../submitQuestionnaires/entities/submitQuestionnaire.entity';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>, //

    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<Questionnaire>,

    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,

    @InjectRepository(SubmitQuestionnaire)
    private readonly submitQuestionnaireRepository: Repository<SubmitQuestionnaire>,
  ) {}
  private readonly logger = new Logger('ANSWER');

  async findAll() {
    return await this.answerRepository.find({
      relations: ['questionnaire', 'question', 'option', 'user'],
    });
  }

  async findOne({ answerId }) {
    const result = await this.answerRepository.findOne({
      where: { id: answerId },
      relations: ['questionnaire', 'question', 'option', 'user'],
    });

    if (!result) {
      this.logger.error(`answerId: ${answerId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 답변입니다.');
    }

    return result;
  }

  async create({ createAnswerInput, userId }) {
    const { questionnaireId, choiceQuestionId, choiceOptionId } =
      createAnswerInput;

    const duplicateOption = await this.answerRepository
      .createQueryBuilder('Answer')
      .where({
        questionnaire: questionnaireId,
        question: choiceQuestionId,
        option: choiceOptionId,
      })
      .getOne();

    if (duplicateOption) {
      this.logger.error(`choiceQuestionId: ${choiceOptionId}가 중복 입니다.`);
      throw new UnprocessableEntityException('이미 선택한 답변 입니다.');
    }

    const optionInfo = await this.optionRepository.find({
      where: { question: { id: choiceQuestionId } },
    });

    const existOption = optionInfo.filter((e) => e.id === choiceOptionId);

    if (existOption.length === 0) {
      this.logger.error(
        `choiceOptionId: ${choiceOptionId}가 존재하지 않습니다.`,
      );
      throw new UnprocessableEntityException('존재하지 않는 선택지 입니다.');
    }

    return await this.answerRepository.save({
      questionnaire: questionnaireId,
      question: choiceQuestionId,
      option: choiceOptionId,
      user: userId,
    });
  }

  async update({ answerId, updateAnswerInput, userId }) {
    const isExist = await this.answerRepository.findOne({
      where: { id: answerId },
    });

    if (!isExist) {
      this.logger.error(`answerId: ${answerId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 답변 입니다.');
    }

    const existOption = await this.optionRepository.find({
      where: { id: updateAnswerInput.optionId },
    });

    if (!existOption) {
      this.logger.error(
        `optionId: ${updateAnswerInput.optionId}가 존재하지 않습니다.`,
      );
      throw new UnprocessableEntityException('존재하지 않는 선택지 입니다.');
    }

    if (isExist.user !== userId) {
      this.logger.error(
        `userId: ${userId}와 설문조한userId: ${isExist.user}가 일치하지 않습니다..`,
      );
      throw new UnprocessableEntityException('유저가 일치하지 않습니다.');
    }

    const result = Object.assign({}, isExist, updateAnswerInput);

    return await this.answerRepository.save(result);
  }

  async delete({ answerId }) {
    const isExist = await this.answerRepository.findOne({
      where: { id: answerId },
    });

    if (!isExist) {
      this.logger.error(`answerId: ${answerId}가 존재하지 않습니다.`);
      throw new UnprocessableEntityException('존재하지 않는 답변 입니다.');
    }

    const result = await this.answerRepository.softDelete({ id: answerId });

    return result.affected ? true : false;
  }

  async submit({ userId, questionnaireId }) {
    const duplicateSubmit = await this.submitQuestionnaireRepository.findOne({
      where: { user: { id: userId } },
    });

    if (duplicateSubmit) {
      this.logger.error(
        `questionnaireId: ${questionnaireId}를 이미 제출했습니다.`,
      );
      throw new UnprocessableEntityException('이미 제출한 설문지 입니다.');
    }

    const questionnaireInfo = await this.questionnaireRepository.findOne({
      where: { id: questionnaireId },
      relations: ['question'],
    });

    const userQuestionnaireInfo = await this.answerRepository.findAndCount({
      where: { user: { id: userId } },
    });

    if (questionnaireInfo.question.length !== userQuestionnaireInfo[1]) {
      this.logger.error(
        `설문지 문항 수: ${questionnaireInfo.question.length} 이(가) 유저의 답변 수: ${userQuestionnaireInfo[1]} 이(가) 일치하지 않습니다.`,
      );
      throw new ConflictException('답변을 모두 완료 해주세요.');
    }

    const totalPoint = await this.answerRepository
      .createQueryBuilder('Answer')
      .leftJoinAndSelect('Answer.option', 'option')
      .where('Answer.questionnaire = :questionnaireId', { questionnaireId })
      .andWhere('Answer.user = :userId', { userId })
      .select('SUM(option.score)', 'sum')
      .getRawOne();

    return await this.submitQuestionnaireRepository.save({
      isSubmitted: true,
      questionnaire: questionnaireId,
      user: userId,
      totalPoint: totalPoint.sum,
    });
  }
}
