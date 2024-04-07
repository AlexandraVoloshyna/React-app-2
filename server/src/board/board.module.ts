import { Module } from "@nestjs/common";
import { BoardService } from "./board.service";
import { BoardController } from "./board.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entities/board.entity";
import { Logging } from "../logging/entities/logging.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Board, Logging])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
