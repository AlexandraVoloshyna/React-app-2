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
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBoardDto: CreateBoardDto) {
    const newBoard = await this.boardService.create(createBoardDto);
    return { message: "Board created successfully", data: newBoard };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const boards = await this.boardService.findAll();
    return { message: "Boards retrieved successfully", data: boards };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("id") id: string) {
    const board = await this.boardService.findOne(id);
    return { message: "Board retrieved successfully", data: board };
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Param("id") id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const updatedBoard = await this.boardService.update(id, updateBoardDto);
    return { message: "Board updated successfully", data: updatedBoard };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async remove(@Param("id") id: string) {
    await this.boardService.remove(id);
    return { message: "Board deleted successfully", data: [] };
  }
}
