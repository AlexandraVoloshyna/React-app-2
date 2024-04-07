import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "./entities/card.entity";
import { List } from "../list/entities/list.entity";
import { Repository } from "typeorm";
import { MoveCardDto } from "./dto/move-card.dto";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async create(createCardDto: CreateCardDto) {
    const { title, description, listId, dueDate, priority } = createCardDto;
    const list = await this.listRepository.findOne({
      where: {
        id: listId,
      },
      relations: { board: true },
    });
    if (!list) {
      throw new NotFoundException("List not found");
    }

    const newCard = this.cardRepository.create({
      dueDate,
      priority,
      title,
      description,
      list,
    });

    return await this.cardRepository.save(newCard);
  }

  async findAll() {
    const cards = await this.cardRepository.find();
    return cards || [];
  }

  async findOne(id: string) {
    const card = await this.cardRepository.findOne({
      where: { id },
    });
    if (!card) {
      throw new NotFoundException("Card not found");
    }
    return card;
  }

  async update(id: string, updateCardDto: UpdateCardDto) {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: {
        list: {
          board: true,
        },
      },
    });
    if (!card) {
      throw new NotFoundException("Card not found");
    }
    const updatedCard = await this.cardRepository.save({
      ...card,
      ...updateCardDto,
    });
    return updatedCard;
  }

  async move(id: string, moveCardDto: MoveCardDto) {
    const { newListTitle } = moveCardDto;
    const card = await this.cardRepository.findOne({
      where: {
        id,
      },
      relations: {
        list: {
          board: true,
        },
      },
    });

    if (!card) {
      throw new NotFoundException("Card not found");
    }

    const newList = await this.listRepository.findOne({
      where: {
        title: newListTitle,
      },
      relations: { board: true },
    });

    if (!newList) {
      throw new NotFoundException("Target list not found");
    }
    card.list = newList;
    const updatedCard = await this.cardRepository.save(card);
    return updatedCard.title;
  }

  async remove(id: string) {
    const card = await this.cardRepository.findOne({
      where: {
        id,
      },
      relations: {
        list: {
          board: true,
        },
      },
    });
    if (!card) {
      throw new NotFoundException("Card not found");
    }
    return await this.cardRepository.remove(card);
  }
}
