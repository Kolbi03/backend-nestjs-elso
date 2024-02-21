import { Module, ValidationPipe } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { APP_PIPE } from '@nestjs/core';
import { TodoHtmlContoller } from './todo.html.contorller';

@Module({
  imports: [],
  controllers: [TodoController, TodoHtmlContoller],
  providers: [
    TodoService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
  ],
})
export class TodoModule {}
