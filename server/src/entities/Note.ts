import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Notebook } from "./Notebook";

@Entity()
export class Note {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  content!: string;

  @Column({ type: "timestamptz" })
  createdAt!: Date;

  @Column({ type: "timestamptz" })
  updatedAt!: Date;

  @ManyToOne(() => Notebook)
  notebook!: Notebook;
}
