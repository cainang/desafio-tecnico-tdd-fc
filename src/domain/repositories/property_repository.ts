import { PropertyEntity } from "../../infrastructure/persistence/entities/property_entity";
import { Property } from "../entities/property";

export interface PropertyRepository {
  save(property: Property): Promise<PropertyEntity>;
  findById(id: string): Promise<Property | null>;
}
