import { IsArray, IsString } from "class-validator";

export class UpdateOrderDto {
    @IsArray()
    @IsString()
    ids: string[]
}