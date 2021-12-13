import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Notebook } from "./Notebook";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ type: "timestamptz" })
  createdAt!: Date;

  @Column({ type: "timestamptz" })
  updatedAt!: Date;

  @OneToMany(() => Notebook, (notebook) => notebook.user)
  notebooks!: Notebook[];
}
