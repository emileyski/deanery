import {
  Listener,
  Subjects,
  StudentCreatedEvent,
} from "@deanery-common/shared";
import { queueGroupName } from "../queueGroupName";
import { Message } from "node-nats-streaming";
import { Student } from "../../models/student";

export class StudentCreatedListener extends Listener<StudentCreatedEvent> {
  readonly subject = Subjects.StudentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: StudentCreatedEvent["data"], msg: Message) {
    try {
      const student = Student.build({
        id: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      await student.save();
    } catch (error) {}

    msg.ack();
  }
}
