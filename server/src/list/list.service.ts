import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { List } from "./entities/list.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "src/board/entities/board.entity";

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async create(createListDto: CreateListDto) {
    const { title, boardId } = createListDto;
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });
    const isDuplicate = await this.listRepository.findOne({
      where: {
        title,
      },
    });
    if (isDuplicate) {
      throw new BadRequestException(
        "List with the provided title already exist, try another one",
      );
    }
    const newList = this.listRepository.create({
      title,
      board,
    });

    return this.listRepository.save(newList);
  }
  async findOptions() {
    const options = await this.listRepository.find({
      select: ["title"],
    });
    const transformedOptions = options.map((option) => ({
      value: option.title.toLowerCase(),
      label: option.title.charAt(0).toUpperCase() + option.title.slice(1),
    }));
    return transformedOptions || [];
  }
  async findAll() {
    const allLists = await this.listRepository.find({
      relations: {
        cards: true,
        board: true,
      },
      order: {
        createdAt: "ASC",
        cards: {
          createdAt: "ASC",
        },
      },
    });
    return allLists || [];
  }

  async findByBoardId(id: string) {
    const lists = await this.listRepository.find({
      where: {
        board: {
          id,
        },
      },
      order: {
        createdAt: "ASC",
        cards: {
          createdAt: "ASC",
        },
      },
      relations: { cards: true },
    });
    return lists || [];
  }

  async update(id: string, updateListDto: UpdateListDto) {
    const { title } = updateListDto;
    const list = await this.listRepository.findOne({
      where: {
        id,
      },
      relations: { board: true },
    });
    if (!list) {
      throw new NotFoundException("List not found");
    }

    if (title) {
      list.title = title.trim().toLowerCase();
    }
    return this.listRepository.save(list);
  }

  async remove(id: string) {
    const list = await this.listRepository.findOne({
      where: {
        id,
      },
      relations: { board: true },
    });
    if (!list) {
      throw new NotFoundException("List not found");
    }
    return await this.listRepository.remove(list);
  }
}
