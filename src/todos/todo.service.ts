import {
  BadRequestException,
  Injectable,
  NotFoundException, Query
} from "@nestjs/common";
import { Todo } from './todo.model';
import { IsInt, IsNotEmpty, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";

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
  @Type(()=> Number)
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



  getTodos({ limit, offset}: GetTodosInput) {
        return this.todos.slice(limit, offset + limit);
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

  public deleteTodos(id: string) {
    const todo = this.getTodo(id);
    if (todo === undefined) {
      throw new NotFoundException();
    } else {
      const todoId = parseInt(todo.id);
      if (todoId === undefined || isNaN(todoId)) {
        throw new BadRequestException();
      } else {
        delete this.todos[todoId];
      }
    }
  }
}
