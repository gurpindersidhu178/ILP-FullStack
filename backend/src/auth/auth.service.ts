import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './models/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Register a new user with hashed password
  async register(email: string, plainPassword: string): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const newUser = new this.userModel({ email, password: hashedPassword 
});
    return newUser.save();
  }

  // Validate user credentials during login
  async validateUser(email: string, plainPassword: string): Promise<User | 
null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(plainPassword, user.password))) {
      return user;
    }
    return null;
  }
}

