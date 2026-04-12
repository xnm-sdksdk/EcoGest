import { DataSource } from "typeorm";
import dotenv from "dotenv";
// Imports entities
import { User } from "../entity/userEntity.js";
import { Project } from "../entity/projectEntity.js";
import { Activity } from "../entity/activityEntity.js";
import { Answer } from "../entity/answerEntity.js";
import { Execution } from "../entity/executionEntity.js";
import { Level } from "../entity/levelEntity.js";
import { MeetingCalls } from "../entity/meetingCallsEntity.js";
import { Photo } from "../entity/photoEntity.js";
import { Proceedings } from "../entity/proceedingsEntity.js";
import { Question } from "../entity/questionEntity.js";
import { Registration } from "../entity/registrationEntity.js";
import { Scoring } from "../entity/scoringEntity.js";

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
    entities: [User, Project, Activity, Answer, Execution, Level, MeetingCalls, Photo, Proceedings, Question, Registration, Scoring],
});

await AppDataSource.initialize();
