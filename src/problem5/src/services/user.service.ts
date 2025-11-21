import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData: { name: string; description?: string }): Promise<User> {
    const trimmedData = {
      name: userData.name.trim(),
      description: userData.description?.trim(),
    };
    return await this.userRepository.create(trimmedData);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getUsers(options: {
    q?: string;
    limit?: number;
    offset?: number;
  }): Promise<User[]> {
    // Set safe defaults to prevent excessive queries
    const limit = options.limit && options.limit > 0 ? Math.min(options.limit, 100) : 10;
    const offset = options.offset && options.offset >= 0 ? options.offset : 0;

    return await this.userRepository.findAll({
      q: options.q,
      limit,
      offset,
    });
  }

  async updateUser(
    id: number,
    updateData: { name?: string; description?: string }
  ): Promise<User> {
    // Prepare update data
    const trimmedData: Partial<User> = {};
    if (updateData.name !== undefined) {
      trimmedData.name = updateData.name.trim();
    }
    if (updateData.description !== undefined) {
      trimmedData.description = updateData.description.trim();
    }

    // Repository will handle existence check and throw if not found
    return await this.userRepository.update(id, trimmedData);
  }

  async deleteUser(id: number): Promise<void> {
    // Repository will handle existence check and throw if not found
    await this.userRepository.softDelete(id);
  }
}
