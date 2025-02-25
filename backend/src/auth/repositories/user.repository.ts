import { Injectable } from '@nestjs/common';
import { User } from '../models/user';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}

