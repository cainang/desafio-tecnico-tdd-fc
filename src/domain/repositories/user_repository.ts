import { UserEntity } from "../../infrastructure/persistence/entities/user_entity";
import { User } from "../entities/user";

export interface UserRepository {
  save(user: User): Promise<UserEntity>;
  findById(id: string): Promise<User | null>;
}
