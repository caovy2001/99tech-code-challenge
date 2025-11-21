import { Repository, FindOptionsWhere, IsNull, Like } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../configs/data-source";

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({
      where: { id, deletedAt: IsNull() } as FindOptionsWhere<User>,
    });
  }

  async findAll(options: {
    q?: string;
    limit?: number;
    offset?: number;
  }): Promise<User[]> {
    const where: FindOptionsWhere<User> = options.q
      ? { name: Like(`%${options.q}%`), deletedAt: IsNull() }
      : { deletedAt: IsNull() };

    return await this.repository.find({
      where,
      take: options.limit,
      skip: options.offset,
      order: { createdAt: "DESC" },
    });
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    // Optimize: Use update with where clause to avoid extra query if service already checked
    const result = await this.repository.update(
      { id, deletedAt: IsNull() } as FindOptionsWhere<User>,
      updateData
    );
    
    if (result.affected === 0) {
      throw new Error("User not found");
    }
    
    // Fetch updated user
    const user = await this.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async softDelete(id: number): Promise<void> {
    // Optimize: Direct update instead of find + save (2 queries -> 1 query)
    const result = await this.repository.update(
      { id, deletedAt: IsNull() } as FindOptionsWhere<User>,
      { deletedAt: new Date().toISOString() }
    );
    
    if (result.affected === 0) {
      throw new Error("User not found");
    }
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.repository.count({
      where: { id, deletedAt: IsNull() } as FindOptionsWhere<User>,
    });
    return count > 0;
  }
}

