import { DataSource } from "typeorm";
import dotenv from "dotenv";
// Imports entities
import { User } from "../entity/userEntity.js";
import { Project } from "../entity/projectEntity.js";
import { Activity } from "../entity/activityEntity.js";
import { Answer } from "../entity/answerEntity.js";
import { Execution } from "../entity/executionEntity.js";
import { Level } from "../entity/levelEntity.js";
import { Convocation } from "../entity/convocationEntity.js";
import { Photo } from "../entity/photoEntity.js";
import { Proceedings } from "../entity/proceedingsEntity.js";
import { Question } from "../entity/questionEntity.js";
import { Registration } from "../entity/registrationEntity.js";
import { Scoring } from "../entity/scoringEntity.js";
import { Challenge } from "../entity/challengeEntity.js";
import { Questionnaire } from "../entity/questionnaireEntity.js";
import { Progress } from "../entity/progressEntity.js";
import { Meeting } from "../entity/meetingEntity.js";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    //synchronize: true,
    logging: true,
    entities: [
        Activity,
        Answer,
        Challenge,
        Convocation,
        Execution,
        Level,
        Meeting,
        Photo,
        Proceedings,
        Progress,
        Project,
        Question,
        Questionnaire,
        Registration,
        Scoring,
        User,
    ],
});

await AppDataSource.initialize();
