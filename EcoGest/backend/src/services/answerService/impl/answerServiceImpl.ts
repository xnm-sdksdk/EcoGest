import { AnswerDTO } from "../../../dto/answerDTO.js";
import { Answer } from "../../../entity/answerEntity.js";
import { AnswerRepository } from "../../../repository/answerRepository.js";
import { AnswerService } from "../answerService.js";

export class AnswerServiceImpl implements AnswerService {
    private answerRepository: typeof AnswerRepository;
    constructor() {
        this.answerRepository = AnswerRepository;
    }

    async findQuestionnaireAnswerResults(
        questionnaireId: number,
    ): Promise<Answer[]> { }

    async submitAnswers(
        questionnaireId: number,
        answerDTO: AnswerDTO,
    ): Promise<Answer[]> { }
}
