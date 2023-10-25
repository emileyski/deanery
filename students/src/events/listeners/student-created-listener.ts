import {
  Listener,
  Subjects,
  StudentCreatedEvent,
} from "@deanery-common/shared";
import { queueGroupName } from "../queueGroupName";
import { Message } from "node-nats-streaming";
import { Student } from "../../models/student";
import { Specialty } from "../../models/speciality";
import { Stream, StreamDoc } from "../../models/stream";
import { Group } from "../../models/group";

const getStreamBySpecialtyId = async (
  specialtyId: string
): Promise<{ stream: StreamDoc; isNewStream: Boolean }> => {
  const specialty = await Specialty.findById(specialtyId);
  if (!specialty) {
    throw new Error("Specialty not found");
  }
  const stream = await Stream.findOne({ specialty });
  if (!stream) {
    const newStream = Stream.build({
      specialty: specialty._id, // fix: add ':' instead of '.'
      name: `${specialty.name}-${new Date().getFullYear()}`,
    });
    await newStream.save();

    return { stream: newStream, isNewStream: true };
  }
  return { stream, isNewStream: false };
};

const getGroupByStreamId = async (streamId: string) => {
  const group = await Group.findOne({ stream: streamId });
  if (!group) {
    const newGroup = Group.build({
      stream: streamId,
      name: "1",
    });
    await newGroup.save();
    return newGroup;
  }
  return group;
};

export class StudentCreatedListener extends Listener<StudentCreatedEvent> {
  readonly subject = Subjects.StudentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: StudentCreatedEvent["data"], msg: Message) {
    try {
      const specialty = await Specialty.findById(data.specialtyId);
      if (!specialty) {
        throw new Error("Specialty not found");
      }

      const stream = await getStreamBySpecialtyId(data.specialtyId);

      const group = await getGroupByStreamId(stream.stream._id);

      const student = Student.build({
        id: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        group: group._id,
      });
      await student.save();
    } catch (error) {}

    msg.ack();
  }
}
