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
    CreateProjectRequest: {
      name: "Compostagem Escolar",
      school: "Escola Secundária de Rodrigues de Freitas",
      schoolYear: "2025/2026",
      state: true,
    },
    UpdateProjectRequest: {
      name: "Compostagem Escolar v2",
    },

    CreateActivityRequest: {
      name: "Plantação de milho",
      description: "Atividade de plantanção.",
      area: "Biodiversidade",
      resources: "Pás, regadores, luvas",
      startDate: "2026-05-15",
      endDate: "2026-05-15",
      createdBy: 1,
    },
    UpdateActivityRequest: {
      name: "Plantação de árvores autóctones v2",
      description: "Atividade de reflorestação no recinto escolar com espécies nativas da região norte de Portugal.",
      area: "Biodiversidade",
      resources: "Pás, regadores, 30 árvores (carvalho, sobreiro, medronheiro), luvas",
      startDate: "2026-05-15",
      endDate: "2026-05-15",
      createdBy: 1,
    },

    CreateLevelRequest: {
      name: "Bronze",
      description: "Nível inicial do programa Eco-Escolas. Atribuído a projetos que estão a dar os primeiros passos na implementação de práticas ambientais sustentáveis na escola.",
      minActivities: 3,
      minAreas: 1,
      order: 1,
    },
    UpdateLevelRequest: {
      name: "Prata",
      description: "Nível intermédio atualizado — escola com forte envolvimento em pelo menos duas áreas temáticas.",
      minActivities: 6,
      minAreas: 2,
      order: 2,
    },

    CreateQuestionRequest: {
      value: "Qual a tua opinião sobre a reciclagem na escola?",
      order: 1,
      required: true,
      type: "text",
      createdBy: 1,
    },
    UpdateQuestionRequest: {
      value: "Texto da pergunta atualizado",
      order: 1,
      required: true,
      type: "text",
    },

    CreateQuestionnaireRequest: {
      title: "Auditoria Ambiental",
      description: "Questionário inicial de diagnóstico ambiental.",
      createdBy: 1,
    },
    UpdateQuestionnaireRequest: {
      title: "Auditoria Ambiental Atualizada",
      description: "Descrição atualizada do questionário.",
    },

    CreatePhotoRequest: {
      path: "/uploads/executions/photo1.jpg",
    },

    CreateConvocationRequest: {
      recipientId: 2,
      createdBy: 1,
    },
  },
};

const outputFile = "./docs/swagger-output.json";
const endpointsFiles = ["./src/main.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);