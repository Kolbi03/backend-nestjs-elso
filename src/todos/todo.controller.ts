import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Query, } from '@nestjs/common';
import { CreateTodoInput, TodoService } from "./todo.service";
import { Todo } from './todo.model';
import { dto } from "./todo.dto";

@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get('/todos')
  getTodos(
    @Query('limit') limit: string | undefined | string[],
    @Query('offset') offset: string | undefined | string[],
  ) {
    if (Array.isArray(limit) || Array.isArray(offset)) {
      throw new BadRequestException();
    } else {
      const limitNum = undefined ? Infinity : parseInt(limit);
      const offsetNum = undefined ? Infinity : parseInt(offset);

      return this.todoService.getTodos(limitNum, offsetNum + limitNum);
    }
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
  postTodo(@Body() todo: CreateTodoInput) {
    this.todoService.postTodo(todo);
  }
}
