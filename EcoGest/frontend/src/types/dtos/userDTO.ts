export enum UserProfile {
  // Admin: Gestor técnico da plataforma, sendo responsável pela criação do projeto anual, registo do coordenador e realização de backups.
  ADMIN = 'admin',
  // Secretariado: Membro com funções alargadas, assumindo acesso às mesmas funções que os membros do conselho assumem, com um acréscimo em funções relacionadas com reuniões.
  SECRETARIAT = 'secretariat',
  // coordenador: Responsável pelo projeto na escola, tendo acesso à gestão de utilizadores, plano de atividades e relatório final.
  COORDINATOR = 'coordinator',
  // Participante ativo do projeto, com permissão para criar propostas de atividades, registar informação no plano de atividades e na execução de atividades.
  MEMBER = 'member',
}

export interface User {
  id: number;
  name: string;
  email: string;
  profile: UserProfile;
  active: boolean;
}
