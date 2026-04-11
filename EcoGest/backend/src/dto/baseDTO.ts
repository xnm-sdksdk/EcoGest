import { IsDateString, IsNotEmpty, IsInt } from "class-validator";

export abstract class BaseDTO {
    @IsInt()
    @IsNotEmpty()
    id!: number;

    @IsDateString()
    @IsNotEmpty()
    createdAt!: string;

    @IsDateString()
    @IsNotEmpty()
    updatedAt!: string;
}
