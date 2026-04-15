import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Project } from "./projectEntity.js";

@Entity()
export class Level extends BaseEntity {
    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "int" })
    minActivities!: number;

    @Column({ type: "int" })
    minAreas!: number;

    @Column({ type: "int" })
    order!: number;

    @OneToMany(() => Project, project => project.level)
    projects!: Project[];
}
