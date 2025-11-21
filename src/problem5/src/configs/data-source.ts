import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

const isProd = process.env.NODE_ENV === "prod";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: "expressdb",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [isProd ? "dist/migrations/**/*.js" : "src/migrations/**/*.ts"],
  migrationsTableName: "migrations",
});
