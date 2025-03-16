import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarConsumer, PulsarClient } from '@jobber/pulsar';
import { Message } from 'pulsar-client';

@Injectable()
export class FibonacciConsumer extends PulsarConsumer implements OnModuleInit {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'Fibonacci');
  }

  protected async onMessage(message: Message): Promise<void> {
    console.log('FibonacciConsumer.onMessage');
    await this.ackknowledge(message);
  }
}
