import { Entity, Column } from "typeorm";
import { BaseEntity } from "./baseEntity.js";

export enum UserRole {
    // Admin: Gestor técnico da plataforma, sendo responsável pela criação do projeto anual, registo do coordenador e realização de backups.
    ADMIN = "admin",
    // Secretariado: Membro com funções alargadas, assumindo acesso às mesmas funções que os membros do conselho assumem, com um acréscimo em funções relacionadas com reuniões.
    SECRETARIAT = "secretariat",
    // coordenador: Responsável pelo projeto na escola, tendo acesso à gestão de utilizadores, plano de atividades e relatório final.
    COORDINATOR = "coordinator",
    // Utilizador nao registado: Utilizador geral, pode visualizar o plano de atividades, detalhes e calendarização, e inscrever-se em atividades.
    UNREGISTERED = "unregistered",
    // Participante ativo do projeto, com permissão para criar propostas de atividades, registar informação no plano de atividades e na execução de atividades.
    MEMBER = "member",
}

@Entity()
export class User extends BaseEntity {
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.UNREGISTERED,
    })
    profile!: UserRole;

    @Column()
    active!: string;

    // TODO
    //@Column(() => User)
    //photoId!: number;

    // TODO
    //@Column(() => User)
    //projectId!: number;

    // TODO
    //@Column(() => User)
    //activityId!: number;

    // TODO
    //@Column(() => User)
    //meetingId!: number;
}
