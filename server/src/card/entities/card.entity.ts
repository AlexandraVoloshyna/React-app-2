import { List } from "src/list/entities/list.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: "Card Name", nullable: false })
  title: string;

  @Column({ default: "Card Description", nullable: false })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP", nullable: false })
  dueDate: Date;

  @Column({ default: "low", enum: ["low", "medium", "high"] })
  priority: string;

  @ManyToOne(() => List, (taskList) => taskList.cards, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  list: List;
}
