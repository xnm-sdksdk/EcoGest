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
    CreateExecutionRequest: {
      date: "2026-05-15",
      location: "Pátio da escola",
      annotation: "Atividade executada com sucesso.",
      createdBy: 1,
      executedBy: 1,
    },
    UpdateExecutionRequest: {
      date: "2026-05-16",
      location: "Auditório",
      annotation: "Anotação atualizada.",
      executedBy: 1,
    },
  },
};

const outputFile = "./docs/swagger-output.json";
const endpointsFiles = ["./src/main.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);