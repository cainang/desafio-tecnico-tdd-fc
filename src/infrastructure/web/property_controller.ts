import { CreateBookingDTO } from "../../application/dtos/create_booking_dto";
import { BookingService } from "../../application/services/booking_service";
import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";
import { PropertyMapper } from "../persistence/mappers/property_mapper";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";
import { PropertyEntity } from "../persistence/entities/property_entity";

export class PropertyController {
  private propertyService: PropertyService;

  constructor(propertyService: PropertyService) {
    this.propertyService = propertyService;
  }

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      if (req.body.name === "" || !req.body.name) {
        throw new Error("O nome da propriedade é obrigatório.");
      }

      if (req.body.maxGuests <= 0) {
        throw new Error("A capacidade máxima deve ser maior que zero.");
      }

      if (!req.body.basePricePerNight) {
        throw new Error("O preço base por noite é obrigatório.");
      }

      const dto: CreatePropertyDTO = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        maxGuests: req.body.maxGuests,
        basePricePerNight: req.body.basePricePerNight,
      };

      const dtoToProperty = PropertyMapper.toDomain(dto as PropertyEntity);

      const property = await this.propertyService.create(dtoToProperty);

      return res.status(201).json({
        message: "Property created successfully",
        property,
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }
}
