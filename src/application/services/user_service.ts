import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user_repository";
import { UserEntity } from "../../infrastructure/persistence/entities/user_entity";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
  async create(user: User): Promise<UserEntity> {
    return this.userRepository.save(user);
  }
}
