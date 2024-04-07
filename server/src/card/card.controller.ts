import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { MoveCardDto } from "./dto/move-card.dto";

@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCardDto: CreateCardDto) {
    const newCard = await this.cardService.create(createCardDto);
    return { message: "Card created successfully", data: newCard };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const cards = await this.cardService.findAll();
    return { message: "Cards retrieved successfully", data: cards };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("id") id: string) {
    const card = await this.cardService.findOne(id);
    return { message: "Card retrieved successfully", data: card };
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    const updatedCard = await this.cardService.update(id, updateCardDto);
    return { message: "Card updated successfully", data: updatedCard };
  }
  @Patch("move/:id")
  @HttpCode(HttpStatus.OK)
  async move(@Param("id") id: string, @Body() moveCardDto: MoveCardDto) {
    const updatedCard = await this.cardService.move(id, moveCardDto);
    return { message: "Card moved successfully", data: updatedCard };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async remove(@Param("id") id: string) {
    await this.cardService.remove(id);
    return { message: "Card deleted successfully", data: [] };
  }
}
