import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger-output.json" with { type: "json" };

// Project routes
import projectRoutes from "./routes/projects.routes.js";
import usersRoutes from "./routes/users.routes.js";
import levelsRoutes from "./routes/levels.routes.js";
import activityRoutes from "./routes/activities.routes.js";
import meetingRoutes from "./routes/meetings.routes.js";
import proceedingsRoutes from "./routes/proceedings.routes.js";
import questionnaireRoutes from "./routes/questionnaires.routes.js";
import questionsRoutes from "./routes/questions.routes.js";
import registrationsRoutes from "./routes/registrations.routes.js";
import dashboardsRoutes from "./routes/dashboards.routes.js";
import executionRoutes from "./routes/executions.routes.js";
import answersRoutes from "./routes/answers.routes.js";
import convocationRoutes from "./routes/convocation.routes.js";
import executionPhotosRoutes from "./routes/executionPhotos.routes.js";
import meetingPhotosRoutes from "./routes/meetingPhotos.routes.js";
import gamificationsRoutes from "./routes/gamifications.routes.js";
import projectMembersRoutes from "./routes/projectMembers.routes.js";
import activityParticipantsRoutes from "./routes/activityParticipants.routes.js";
import authRoutes from "./routes/auth.routes.js";

import { httpLogger } from "./utils/logger/logger.js";
import { AppDataSource } from "./config/data-source.js";

const PORT = 8080;
const app = express();

app.use(helmet());
app.use(cors());
app.use(httpLogger);
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(limiter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", projectRoutes);
app.use("/api", usersRoutes);
app.use("/api", levelsRoutes);
app.use("/api", activityRoutes);
app.use("/api", meetingRoutes);
app.use("/api", proceedingsRoutes);
app.use("/api", questionnaireRoutes);
app.use("/api", questionsRoutes);
app.use("/api", registrationsRoutes);
app.use("/api", dashboardsRoutes);
app.use("/api", executionRoutes);
app.use("/api", answersRoutes);
app.use("/api", convocationRoutes);
app.use("/api", executionPhotosRoutes);
app.use("/api", meetingPhotosRoutes);
app.use("/api", gamificationsRoutes);
app.use("/api", projectMembersRoutes);
app.use("/api", activityParticipantsRoutes);
app.use("/api", authRoutes);

await AppDataSource.initialize();

app.listen(PORT, () => console.log(`EcoGest API running on port ${PORT}`));

export { app };
