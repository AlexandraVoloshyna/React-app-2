import { Board } from "src/board/entities/board.entity";
import { Card } from "src/card/entities/card.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: "List name", nullable: false })
  title: string;

  @OneToMany(() => Card, (card) => card.list)
  cards: Card[];

  @ManyToOne(() => Board, (board) => board.lists, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  board: Board;
}
