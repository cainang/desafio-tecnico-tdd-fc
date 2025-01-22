import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import { PropertyEntity } from "../../infrastructure/persistence/entities/property_entity";

export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async findPropertyById(id: string): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }

  async create(property: Property): Promise<PropertyEntity> {
    return this.propertyRepository.save(property);
  }
}
