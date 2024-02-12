import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { message } from './message.model';

@Controller('/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  postMessage(@Body() message: message) {
    return this.messageService.postMessage(message);
  }
}
