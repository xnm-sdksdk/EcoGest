import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "EcoGest API",
    description: "API REST da plataforma EcoGest",
    version: "1.0.0",
  },
  host: "localhost:8080",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Bearer Token",
    },
  },
  definitions: {
    LoginRequest: {
      email: "admin@ecogest.pt",
      password: "password123",
    },
    CreateUserRequest: {
      name: "João Silva",
      email: "joao@ecogest.pt",
      password: "password123",
      profile: "MEMBER",
    },
    UpdateUserRequest: {
      name: "João Silva Atualizado",
      email: "joao@ecogest.pt",
    },
    CreateProjectRequest: {
      name: "Compostagem Escolar",
      school: "Escola Secundária de Rodrigues de Freitas",
      schoolYear: "2025/2026",
      state: true,
    },
    UpdateProjectRequest: {
      name: "Compostagem Escolar v2",
    },
    ProjectMemberRequest: {
      userId: 2,
    },
    CreateActivityRequest: {
      name: "Plantação de milho",
      description: "Atividade de plantação.",
      area: "Biodiversidade",
      resources: "Pás, regadores, luvas",
      startDate: "2026-05-15",
      endDate: "2026-05-15",
    },
    UpdateActivityRequest: {
      name: "Plantação de árvores autóctones v2",
      description: "Atividade de reflorestação.",
      area: "Biodiversidade",
      resources: "Pás, regadores, luvas",
      startDate: "2026-05-15",
      endDate: "2026-05-15",
    },
    ActivityParticipantRequest: {
      userId: 2,
    },
    CreateExecutionRequest: {
      date: "2026-05-15",
      location: "Pátio da escola",
      annotation: "Atividade executada com sucesso.",
      executedBy: 1,
    },
    UpdateExecutionRequest: {
      date: "2026-05-16",
      location: "Auditório",
      annotation: "Anotação atualizada.",
      executedBy: 1,
    },
    CreatePhotoRequest: {
      path: "/uploads/executions/photo1.jpg",
    },
    CreateMeetingRequest: {
      date: "2026-05-10T14:30:00",
      location: "Sala 1",
      workOrder: "Planeamento Eco-Escolas",
    },
    UpdateMeetingRequest: {
      location: "Auditório",
      workOrder: "Planeamento atualizado",
      state: "scheduled",
    },
    CreateConvocationRequest: {
      recipientId: 2,
    },
    CreateProceedingsRequest: {
      content: "Ata da reunião",
    },
    UpdateProceedingsRequest: {
      content: "Ata atualizada da reunião",
    },
    CreateQuestionnaireRequest: {
      title: "Auditoria Ambiental",
      description: "Questionário inicial de diagnóstico ambiental.",
    },
    UpdateQuestionnaireRequest: {
      title: "Auditoria Ambiental Atualizada",
      description: "Descrição atualizada do questionário.",
    },
    CreateQuestionRequest: {
      value: "Qual a tua opinião sobre a reciclagem na escola?",
      order: 1,
      required: true,
      type: "text",
    },
    UpdateQuestionRequest: {
      value: "Texto da pergunta atualizado",
      order: 1,
      required: true,
      type: "text",
    },
    SubmitAnswersRequest: {
      answers: [{ questionId: 1, value: "Muito importante" }],
    },
    CreateLevelRequest: {
      name: "Bronze",
      description: "Nível inicial do programa Eco-Escolas.",
      minActivities: 3,
      minAreas: 1,
      order: 1,
    },
    UpdateLevelRequest: {
      name: "Prata",
      description: "Nível intermédio.",
      minActivities: 6,
      minAreas: 2,
      order: 2,
    },
    CreateScoringRequest: {
      userId: 1,
      points: 50,
      reason: "Atividade concluída",
    },
  },
};

const outputFile = "./docs/swagger-output.json";
const endpointsFiles = ["./src/main.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
