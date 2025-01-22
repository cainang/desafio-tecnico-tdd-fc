import { CreateBookingDTO } from "../../application/dtos/create_booking_dto";
import { BookingService } from "../../application/services/booking_service";
import { Request, Response } from "express";
import { UserService } from "../../application/services/user_service";
import { CreateUserDTO } from "../../application/dtos/create_user_dto";
import { UserMapper } from "../persistence/mappers/user_mapper";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.name) {
        return res.status(400).json({ message: "O campo nome é obrigatório." });
      }

      const dto: CreateUserDTO = {
        id: req.body.id,
        name: req.body.name,
      };

      const dtoToUser = UserMapper.toDomain(dto);

      const user = await this.userService.create(dtoToUser);

      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }
}
