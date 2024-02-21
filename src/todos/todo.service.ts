import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Todo } from './todo.model';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export type CreateTodoInput = Omit<Todo, 'id'>;

export class TodoInput {
  @IsNotEmpty()
  text!: string;
}

export class GetTodosInput {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  offset?: number;
}

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [
    {
      id: '1',
      text: 'Aludni',
    },
    {
      id: '2',
      text: 'Kutyának kaját adni',
    },
    {
      id: '3',
      text: 'Suliba menni',
    },
  ];

  getTodos({ limit = Infinity, offset = 0 }: GetTodosInput) {
    return this.todos.slice(offset, offset + limit);
  }

  getAllTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }
  public postTodo(todoInput: TodoInput) {
    const todo: Todo = {
      id: Math.random().toString(),
      ...todoInput,
    };
    this.todos.push(todo);
  }

  public putTodo(id: string, input: CreateTodoInput) {
    const todo = this.getTodo(id);
    if (!todo) {
      throw new NotFoundException();
    }
    Object.assign(todo, input);
    return todo;
  }

  public deleteTodos(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return;
    }
    this.todos.splice(index, 1);
  }
}
