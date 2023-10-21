import {
  Publisher,
  SpecialtyCreatedEvent,
  Subjects,
} from "@deanery-common/shared";

export class SpecialtyCreatedPublisher extends Publisher<SpecialtyCreatedEvent> {
  subject: Subjects.SpecialtyCreated = Subjects.SpecialtyCreated;
}
