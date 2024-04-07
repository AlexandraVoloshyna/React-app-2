import { IsOptional, IsString } from "class-validator";

export class CreateBoardDto {
  @IsOptional()
  @IsString()
  title: string;
}
