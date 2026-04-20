import "reflect-metadata";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
// Project routes
import projectRoutes from "./routes/projects.routes.js";
import usersRoutes from "./routes/users.routes.js";

import { httpLogger } from "./utils/logger/logger.js";

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

app.use("/api", projectRoutes);
app.use("/api", usersRoutes);

app.listen(PORT, () => console.log(`EcoGest API running on port ${PORT}`));
