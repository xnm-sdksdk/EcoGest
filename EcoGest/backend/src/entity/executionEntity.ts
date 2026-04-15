import { Entity, Column, JoinColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity.js";
import { Activity } from "./activityEntity.js";
import { Photo } from "./photoEntity.js";
import { User } from "./userEntity.js";

@Entity()
export class Execution extends BaseEntity {
    @Column({ type: "date" })
    date!: Date;

    @Column({ type: "varchar", nullable: true })
    location!: string | null;

    @Column({ type: "text", nullable: true })
    annotation!: string | null;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "createdBy" })
    createdBy!: User | null;

    @OneToOne(() => Activity, (activity) => activity.execution)
    @JoinColumn({ name: "activityId" })
    activity!: Activity;

    @OneToMany(() => Photo, (photo) => photo.execution)
    photos!: Photo[];

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: "executedById" })
    executedBy!: User | null;
}
