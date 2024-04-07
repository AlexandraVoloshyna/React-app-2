import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Logging } from "./entities/logging.entity";
import { Repository } from "typeorm";

@Injectable()
export class LoggingService {
  constructor(
    @InjectRepository(Logging)
    private loggingRepository: Repository<Logging>,
  ) {}
  async findByBoardId(id: string) {
    const logs = await this.loggingRepository.find({
      where: { boardId: id },
      order: {
        createdAt: "ASC",
      },
    });
    return logs || [];
  }

  async findByCardId(id: string) {
    const cardLogs = await this.loggingRepository.find({
      where: { entityId: id },
      order: { createdAt: "ASC" },
    });
    if (!cardLogs) {
      throw new NotFoundException("Logs for the Card not found");
    }

    return cardLogs;
  }
}
