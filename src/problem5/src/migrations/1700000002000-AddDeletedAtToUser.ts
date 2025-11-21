import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDeletedAtToUser1700000002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasColumn = await queryRunner.hasColumn("user", "deleted_at");
    if (hasColumn) {
      return;
    }

    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "deleted_at",
        type: "datetime",
        isNullable: true,
        default: null,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasColumn = await queryRunner.hasColumn("user", "deleted_at");
    if (!hasColumn) {
      return;
    }

    await queryRunner.dropColumn("user", "deleted_at");
  }
}

