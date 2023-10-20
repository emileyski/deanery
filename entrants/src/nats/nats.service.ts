// nats/nats.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nats from 'node-nats-streaming'; // Correct import statement
import { Stan } from 'node-nats-streaming'; // Ensure the correct import
import { AccountCreatedListener } from './listeners/account-created-listener';
// import { TicketCreatedListener } from './ticket-created-listener';

@Injectable()
export class NatsService implements OnModuleInit {
  private _client?: Stan;

  constructor(private accountCreatedListener: AccountCreatedListener) {}

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS before connecting');
    }
    return this._client;
  }

  async onModuleInit() {
    await this.connect(
      process.env.NATS_CLUSTER_ID || 'deanery',
      process.env.NATS_CLIENT_ID || 'entrants-service',
      process.env.NATS_URL || 'http://localhost:4222',
    );
  }

  async connect(
    clusterId: string,
    clientId: string,
    url: string,
  ): Promise<void> {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        // this.ticketCreatedListener(this.client).listen();
        // this.ticketCreatedListener.setClient(this.client);
        // this.ticketCreatedListener.listen();
        this.accountCreatedListener.setClient(this.client);
        this.accountCreatedListener.listen();
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}
