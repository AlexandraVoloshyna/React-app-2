import { IsNotEmpty, IsString } from "class-validator";

export class MoveCardDto {
  @IsString()
  @IsNotEmpty()
  newListTitle: string;
}
