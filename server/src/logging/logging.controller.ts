import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { LoggingService } from "./logging.service";

@Controller("logging")
export class LoggingController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get("board/:id")
  @HttpCode(HttpStatus.OK)
  async findByBoardId(@Param("id") id: string) {
    const BoardLogs = await this.loggingService.findByBoardId(id);
    return { message: "Logs retrieved successfully", data: BoardLogs };
  }

  @Get("card/:id")
  @HttpCode(HttpStatus.OK)
  async findByCardId(@Param("id") id: string) {
    const cardLogs = await this.loggingService.findByCardId(id);
    return { message: "Card logs retrieved successfully", data: cardLogs };
  }
}
