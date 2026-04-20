import pino from "pino";
import { pinoHttp } from "pino-http";
import { LOG_LEVELS } from "./logLevels.js";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level: process.env.LOG_LEVEL || LOG_LEVELS.INFO,
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: { colorize: true, translateTime: "HH:MM:ss" },
    },
  }),
});

export const httpLogger = pinoHttp({ logger: logger });
