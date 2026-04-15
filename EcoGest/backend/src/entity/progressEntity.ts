import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Challenge } from "./challengeEntity.js";
import { User } from "./userEntity.js";

@Entity()
export class Progress extends BaseEntity {
    @Column({ type: "int", default: 0 })
    activitiesConcluded!: number;

    @Column({ type: "int", default: 0 })
    photosSubmitted!: number;

    @Column({ type: "boolean", default: false })
    completed!: boolean;

    @ManyToOne(() => Challenge, challenge => challenge.progress)
    @JoinColumn({ name: "challengeId" })
    challenge!: Challenge;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;
}