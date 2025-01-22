import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../../persistence/entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe("Booking Test", () => {
    it("deve converter BookingEntity em Booking corretamente", () => {
        let bookingEntity = new BookingEntity();

        const property = new PropertyEntity();
        property.id = "1";
        property.name = "Casa na Praia";
        property.description = "Vista para o mar";
        property.maxGuests = 6;
        property.basePricePerNight = 200;

        const user = new UserEntity();
        user.id = "1";
        user.name = "Carlos";

        bookingEntity.id = "1";
        bookingEntity.guest = user;
        bookingEntity.property = property;
        bookingEntity.startDate = new Date()
        bookingEntity.endDate = new Date("2025-01-30")
        bookingEntity.guestCount = 2
        bookingEntity.totalPrice = 100
        bookingEntity.status = "CONFIRMED"

        const bookingMappedDomain = BookingMapper.toDomain(bookingEntity);

        expect(bookingMappedDomain.getId()).toBe("1");
        expect(bookingMappedDomain.getStatus()).toBe("CONFIRMED");
    })

    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
        let bookingEntity = new BookingEntity();

        bookingEntity.id = "1";

        expect(() => {
            BookingMapper.toDomain(bookingEntity);
        }).toThrow("Há campos obrigatórios que não foram preenchidos.");
    })

    it("deve converter Booking para BookingEntity corretamente", () => {
        const booking = new Booking("1", new Property("1", "Casa na Praia", "Vista para o mar", 6, 200), new User("1", "Carlos"), new DateRange(new Date(), new Date("2025-01-30")), 2);
        const bookingMappedPersistence = BookingMapper.toPersistence(booking);
        

        expect(bookingMappedPersistence.id).toBe("1");
        expect(bookingMappedPersistence.status).toBe("CONFIRMED");
    })
})