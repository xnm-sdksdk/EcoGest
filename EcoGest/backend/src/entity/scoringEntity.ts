import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { User } from "./userEntity.js";
import { Project } from "./projectEntity.js";

@Entity()
export class Scoring extends BaseEntity {
    @Column({ type: "int" })
    points!: number;

    @Column({ type: "varchar" })
    reason!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;

    @ManyToOne(() => Project)
    @JoinColumn({ name: "projectId" })
    project!: Project;
}
