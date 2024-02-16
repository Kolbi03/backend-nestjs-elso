import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { CreateTodoInput, TodoInput, TodoService } from "./todo.service";
import type { Response } from 'express';
import { GetTodosInput } from "./todo.service";

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/todos')
  getTodos(@Query() input: GetTodosInput) {
    return this.todoService.getTodo(input);
  }


  @Get('/todos/:id')
  getTodo(@Param('id') id: string) {
    const todo = this.todoService.getTodo(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  @Post('/todos')
  postTodo(@Body() todo: TodoInput) {
    this.todoService.postTodo(todo);
  }

  @Get('/todohtml')
  getPage(@Res() res: Response) {
    res.sendFile('todo.html', { root: 'src/todos' });
  }

  @Get('/alltodos')
  getAllTodos() {
    this.todoService.getAllTodos();
  }

  @Put('/todos/:id')
  PutTodo(@Param('id') id: string, @Body() body: CreateTodoInput) {
    const todo = this.todoService.getTodo(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return (todo.text = body.text);
  }

  @Delete('/todos/:id')
  deleteTodo(@Param('id') id: string) {
    this.todoService.deleteTodos(id);
  }
}
