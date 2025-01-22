import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("Property Test", () => {
    it("deve converter PropertyEntity em Property corretamente", () => {
        let propertyEntity = new PropertyEntity();
        propertyEntity.id = "1";
        propertyEntity.name = "Casa na Praia";
        propertyEntity.description = "Vista para o mar";
        propertyEntity.maxGuests = 6;
        propertyEntity.basePricePerNight = 200;

        const propertyMappedDomain = PropertyMapper.toDomain(propertyEntity);

        expect(propertyMappedDomain.getId()).toBe("1");
        expect(propertyMappedDomain.getDescription()).toBe("Vista para o mar");
    })

    it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
        let propertyEntity = new PropertyEntity();
        
        propertyEntity.id = "1";

        expect(() => {
            PropertyMapper.toDomain(propertyEntity);
        }).toThrow("Há campos obrigatórios que não foram preenchidos.");
    })

    it("deve converter Property para PropertyEntity corretamente", () => {
        const property = new Property("1", "Casa na Praia", "Vista para o mar", 6, 200);
        const propertyMappedPersistence = PropertyMapper.toPersistence(property);

        expect(propertyMappedPersistence.id).toBe("1");
        expect(propertyMappedPersistence.name).toBe("Casa na Praia");
    })
})