import {
  Publisher,
  StudentCreatedEvent,
  Subjects,
} from '@deanery-common/shared';

export class StudentCreatedPublisher extends Publisher<StudentCreatedEvent> {
  subject: Subjects.StudentCreated = Subjects.StudentCreated;
}
