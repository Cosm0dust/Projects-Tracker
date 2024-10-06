import { IsNumber, IsOptional, Max, Min } from "class-validator";
import { User } from "./user.entity";
import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PrimaryGeneratedColumn } from "typeorm";

export class PomodoroSettingsDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    workInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    breakInterval?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10)
    intervalsCount?: number;
}


export class UserDto extends PartialType(User) implements PomodoroSettingsDto {

}
   
