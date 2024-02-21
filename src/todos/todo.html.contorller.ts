import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { CreateTodoInput, TodoInput, TodoService } from './todo.service';
import { Response, response } from 'express';

@Controller('todo-html')
export class TodoHtmlContoller {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Render('todo/list')
  listTodos() {
    return {
      todos: this.todoService.getTodos({}),
      message: null,
    };
  }

  @Get('/:id')
  listTodoID(@Param('id') id: string, @Res() res: Response) {
    const todo = this.todoService.getTodo(id);
    if (todo === undefined) {
      throw new BadRequestException();
    }
    return res.render('todo/details', {
      todo,
    });
  }

  @Post('/:id')
  updateTodo(
    @Param('id') id: string,
    @Body() body: CreateTodoInput,
    @Res() res: Response,
  ) {
    this.todoService.putTodo(id, body);

    res.render('todo/list', {
      message: 'Sikeres todo létrehozás',
      todos: this.todoService.getTodos({}),
    });
  }

  @Post()
  postTodo(@Body() todo: TodoInput, @Res() res: Response) {
    this.todoService.postTodo(todo);

    res.render('todo/list', {
      message: 'Sikeres todo létrehozás',
      todos: this.todoService.getTodos({}),
    });
  }

  @Post('/delete/:id')
  deleteTodo(@Param('id') id: string, @Res() res: Response) {
    this.todoService.deleteTodos(id);

    res.render('todo/list', {
      message: 'Sikeres todo létrehozás',
      todos: this.todoService.getTodos({}),
    });
  }
}
