import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CardActions, ListActions } from "../enums";

@Entity()
export class Logging extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  entityId: string;

  @Column()
  boardId: string;

  @Column()
  entityName: string;

  @Column()
  entityType: "List" | "Card";

  @Column()
  actionType: CardActions | ListActions;
}
