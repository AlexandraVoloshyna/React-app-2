import { IsDateString, IsOptional, IsString } from "class-validator";

export class UpdateCardDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsDateString()
  dueDate: Date;
  @IsOptional()
  @IsString()
  priority: string;
}
