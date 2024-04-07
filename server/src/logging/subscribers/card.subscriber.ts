import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";
import { CardActions } from "../enums";
import { Card } from "../../card/entities/card.entity";
import { Logging } from "../entities/logging.entity";

@EventSubscriber()
export class LoggingCardSubscriber implements EntitySubscriberInterface<Card> {
  listenTo() {
    return Card;
  }
  async afterInsert(event: InsertEvent<Card>) {
    const log = new Logging();
    log.actionType = CardActions.CREATE;
    log.entityName = event.entity.title;
    log.boardId = event.entity.list.board.id;
    log.entityId = event.entity.id;
    log.entityType = "Card";
    await event.manager.save(log);
  }
  async afterUpdate(event: UpdateEvent<Card>) {
    const log = new Logging();
    log.actionType = CardActions.UPDATE;
    log.entityName = event.entity.title;
    log.boardId = event.entity.list.board.id;
    log.entityId = event.entity.id;
    log.entityType = "Card";
    await event.manager.save(log);
  }
  async beforeRemove(event: RemoveEvent<Card>) {
    const log = new Logging();
    log.actionType = CardActions.DELETE;
    log.entityName = event.entity.title;
    log.boardId = event.entity.list.board.id;
    log.entityId = event.entity.id;
    log.entityType = "Card";
    await event.manager.save(log);
  }
}
