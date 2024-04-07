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
import { ListService } from "./list.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";

@Controller("list")
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createListDto: CreateListDto) {
    const newList = await this.listService.create(createListDto);
    return { message: "List created successfully", data: newList };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const lists = await this.listService.findAll();
    return { message: "Lists retrieved successfully", data: lists };
  }

  @Get("options")
  @HttpCode(HttpStatus.OK)
  async findOptions() {
    const options = await this.listService.findOptions();
    return { message: "Options retrieved successfully", data: options };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("id") id: string) {
    const lists = await this.listService.findByBoardId(id);
    return { message: "Lists retrieved successfully", data: lists };
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  async update(@Param("id") id: string, @Body() updateListDto: UpdateListDto) {
    const updatedList = await this.listService.update(id, updateListDto);
    return { message: "List updated successfully", data: updatedList };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async remove(@Param("id") id: string) {
    await this.listService.remove(id);
    return { message: "List deleted successfully", data: [] };
  }
}
