import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Notebook } from "./Notebook";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column({ type: "timestamptz" })
  createdAt!: Date;

  @Column({ type: "timestamptz" })
  updatedAt!: Date;

  @ManyToOne(() => Notebook)
  @JoinColumn({ name: "notebookId" })
  notebook!: Notebook;

  @Column({ nullable: true })
  notebookId?: string;
}
