import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { PageModule } from './index/page.module';
import { TodoModule } from './todos/todo.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AdminModule,
    PageModule,
    TodoModule,
    FibonacciModule,
    MessageModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
