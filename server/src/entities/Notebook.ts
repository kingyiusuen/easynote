import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Note } from "./Note";

@Entity()
export class Notebook {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "timestamptz" })
  createdAt!: Date;

  @Column({ type: "timestamptz" })
  updatedAt!: Date;

  @ManyToOne(() => User)
  author!: User;

  @OneToMany(() => Note, (note) => note.notebook)
  notes!: Note[];
}
