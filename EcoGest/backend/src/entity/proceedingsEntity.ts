import { Entity, BaseEntity, Column } from "typeorm";

@Entity()
export class Proceedings extends BaseEntity {
    @Column()
    content!: string;

    @Column({ nullable: false })
    createdBy!: string;

    meetingId!: number;
}
