import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  public name!: string;

  @Column({ type: "longtext", nullable: true })
  public description?: string;

  @Column({ name: "created_at", type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  public createdAt!: string;

  @Column({
    name: "updated_at",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  public updatedAt!: string;

  @Column({ name: "deleted_at", type: "datetime", nullable: true, default: null })
  public deletedAt?: string | null;
}
