import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}