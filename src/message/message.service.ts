import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  async postMessage(message: Message) {
    const newMessage: Message = {
      ...message,
    };

    await fs.writeFile(
      'message.txt',
      newMessage.sender + ': ' + newMessage.content,
    );
  }
}
