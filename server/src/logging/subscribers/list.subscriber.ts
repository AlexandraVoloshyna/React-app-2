import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from "typeorm";
import { ListActions } from "../enums";
import { List } from "../../list/entities/list.entity";
import { Logging } from "../entities/logging.entity";

@EventSubscriber()
export class LoggingListSubscriber implements EntitySubscriberInterface<List> {
  listenTo() {
    return List;
  }
  async afterInsert(event: InsertEvent<List>) {
    const log = new Logging();
    log.actionType = ListActions.CREATE;
    log.entityName = event.entity.title;
    log.boardId = event.entity.board.id;
    log.entityId = event.entity.id;
    log.entityType = "List";
    await event.manager.save(log);
  }
  async afterUpdate(event: UpdateEvent<List>) {
    const log = new Logging();
    log.actionType = ListActions.UPDATE;
    log.entityName = event.entity.title;
    log.entityId = event.entity.id;
    log.boardId = event.entity.board.id;
    log.entityType = "List";
    await event.manager.save(log);
  }
  async beforeRemove(event: RemoveEvent<List>) {
    const log = new Logging();
    log.actionType = ListActions.DELETE;
    log.entityName = event.entity.title;
    log.entityId = event.entity.id;
    log.boardId = event.entity.board.id;
    log.entityType = "List";
    await event.manager.save(log);
  }
}
