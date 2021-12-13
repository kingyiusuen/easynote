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

  @Column({ default: "" })
  title!: string;

  @Column("text", { default: "" })
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
