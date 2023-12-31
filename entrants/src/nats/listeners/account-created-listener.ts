import {
  Listener,
  AccountCreatedEvent,
  Subjects,
} from '@deanery-common/shared';
import { Injectable } from '@nestjs/common';
import { queueGroupName } from '../queueGroupName';
import { Message } from 'node-nats-streaming';
import { EntrantsRepository } from 'src/entrants/entrants.repository';
@Injectable()
export class AccountCreatedListener extends Listener<AccountCreatedEvent> {
  constructor(private entrantsRepo: EntrantsRepository) {
    super(null);
  }

  readonly subject = Subjects.AccountCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: AccountCreatedEvent['data'], msg: Message) {
    const entrant = this.entrantsRepo.create({
      id: data.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: '',
    });

    await this.entrantsRepo.save(entrant);

    msg.ack();
  }

  setClient(client) {
    this.client = client;
  }
}
