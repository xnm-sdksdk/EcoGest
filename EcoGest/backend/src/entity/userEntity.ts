import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {BaseEntity} from "./baseEntity.js";
import {Project} from "./projectEntity.js";

export enum UserProfile {
  // Admin: Gestor técnico da plataforma, sendo responsável pela criação do projeto anual, registo do coordenador e realização de backups.
  ADMIN = "admin",
  // Secretariado: Membro com funções alargadas, assumindo acesso às mesmas funções que os membros do conselho assumem, com um acréscimo em funções relacionadas com reuniões.
  SECRETARIAT = "secretariat",
  // coordenador: Responsável pelo projeto na escola, tendo acesso à gestão de utilizadores, plano de atividades e relatório final.
  COORDINATOR = "coordinator",
  // Participante ativo do projeto, com permissão para criar propostas de atividades, registar informação no plano de atividades e na execução de atividades.
  MEMBER = "member",
}

@Entity()
export class User extends BaseEntity {
  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar", select: false })
  password!: string;

  @Column({
    type: "enum",
    enum: UserProfile,
    default: UserProfile.MEMBER,
  })
  profile!: UserProfile;

  @Column({ type: "boolean", default: true })
  active!: boolean;

  @ManyToMany(() => Project)
  @JoinTable({ name: "project_members" })
  projects!: Project[];
}
