import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: '1',
      username: 'Győző',
      password: 'aaa',
    },
    {
      id: '2',
      username: 'Dukloren',
      password: 'aaaaa',
    },
    {
      id: '3',
      username: 'Kolbi',
      password: 'gdf',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
