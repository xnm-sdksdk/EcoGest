import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "EcoGest API",
    description: "API REST da plataforma EcoGest",
    version: "1.0.0",
  },
  host: "localhost:8080",
  schemes: ["http"],
  definitions: {
    CreateMeetingRequest: {
      date: "2026-05-10T14:30:00",
      location: "Sala 1",
      workOrder: "Planeamento Eco-Escolas",
      createdBy: 1,
    },
    UpdateMeetingRequest: {
      location: "Auditório",
      workOrder: "Planeamento atualizado",
      state: "scheduled",
    },
    CreateProceedingsRequest: {
      content: "Ata da reunião",
      createdBy: 1,
    },
    UpdateProceedingsRequest: {
      content: "Ata atualizada da reunião",
    },
  },
};

const outputFile = "./docs/swagger-output.json";
const endpointsFiles = ["./src/main.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);