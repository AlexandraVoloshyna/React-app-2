import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreateCardDto {
  @IsOptional()
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsDate()
  dueDate: Date;
  @IsOptional()
  @IsString()
  priority: string;
  @IsNotEmpty()
  @IsString()
  listId: string;
}
