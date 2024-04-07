import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./entities/board.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Logging } from "../logging/entities/logging.entity";

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Logging)
    private readonly loggingRepository: Repository<Logging>,
  ) {}
  async create(createBoardDto: CreateBoardDto) {
    const { title } = createBoardDto;
    const isDuplicate = await this.boardRepository.findOne({
      where: {
        title,
      },
    });
    if (isDuplicate) {
      throw new BadRequestException(
        "Board with the provided title already exist, try another one",
      );
    }
    const newBoard = this.boardRepository.create({
      title,
    });

    return this.boardRepository.save(newBoard);
  }
  async findAll() {
    const allBoards = await this.boardRepository.find({
      order: {
        createdAt: "ASC",
      },
    });
    return allBoards || [];
  }

  async findOne(id: string) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });
    if (!board) {
      throw new NotFoundException("Board with the provided id not found");
    }
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const { title } = updateBoardDto;
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });
    if (!board) {
      throw new NotFoundException("Board not found");
    }

    if (title) {
      board.title = title.trim().toLowerCase();
    }
    return this.boardRepository.save(board);
  }

  async remove(id: string) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });
    if (!board) {
      throw new NotFoundException("Board not found");
    }
    await this.loggingRepository.delete({ boardId: id });
    return await this.boardRepository.remove(board);
  }
}
