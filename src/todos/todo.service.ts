import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';
import { dto } from "./todo.dto";

export type CreateTodoInput = Omit<Todo, 'id'>;

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
  getTodos(offset: number, limit: number): Todo[] {
    return this.todos.slice(offset, offset + limit);
  }
  getTodo(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }
  public postTodo(todoInput: CreateTodoInput) {
    const todo: Todo = {
      id: Math.random().toString(),
      ...todoInput,
    };
    this.todos.push(todo);
  }
}
