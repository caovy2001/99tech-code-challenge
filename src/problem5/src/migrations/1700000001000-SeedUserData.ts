import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUserData1700000001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO user (name, description, created_at, updated_at) VALUES
      ('John Doe', 'Software engineer with 5 years of experience in web development. Passionate about TypeScript and Node.js.', NOW(), NOW()),
      ('Jane Smith', 'Product manager specializing in SaaS applications. Expert in agile methodologies and user experience design.', NOW(), NOW()),
      ('Bob Johnson', 'Full-stack developer with expertise in React, Express, and MySQL. Enjoys building scalable applications.', NOW(), NOW()),
      ('Alice Williams', 'DevOps engineer focused on containerization and CI/CD pipelines. Experienced with Docker and Kubernetes.', NOW(), NOW()),
      ('Charlie Brown', 'Frontend developer passionate about creating beautiful and accessible user interfaces. Skilled in modern CSS and JavaScript frameworks.', NOW(), NOW())
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM user WHERE name IN (
        'John Doe',
        'Jane Smith',
        'Bob Johnson',
        'Alice Williams',
        'Charlie Brown'
      )
    `);
  }
}

