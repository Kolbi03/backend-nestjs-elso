import { Injectable } from '@nestjs/common';
import fs from 'fs/promises';
import { message } from './message.model';

@Injectable()
export class MessageService {
  async postMessage(message: message) {
    const newMessage: message = {
      ...message,
    };

    await fs.writeFile(
      'message.txt',
      newMessage.sender + ': ' + newMessage.content,
    );
  }
}
