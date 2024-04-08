import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Card } from "../card/entities/card.entity";
import { List } from "../list/entities/list.entity";
import { LoggingCardSubscriber } from "../logging/subscribers/card.subscriber";
import { LoggingListSubscriber } from "../logging/subscribers/list.subscriber";
import { Logging } from "../logging/entities/logging.entity";
import { Board } from "../board/entities/board.entity";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction =
      this.configService.get<string>("NODE_ENV") === "production";

    if (isProduction) {
      return {
        type: "postgres",
        url: this.configService.get<string>("DB_URL"),
        synchronize: true,
        entities: [Card, List, Logging, Board],
        subscribers: [LoggingCardSubscriber, LoggingListSubscriber],
      };
    } else {
      return {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: this.configService.get<string>("POSTGRES_USER"),
        password: this.configService.get<string>("POSTGRES_PASSWORD"),
        database: this.configService.get<string>("POSTGRES_DB"),
        synchronize: true,
        entities: [Card, List, Logging, Board],
        subscribers: [LoggingCardSubscriber, LoggingListSubscriber],
      };
    }
  }
}
