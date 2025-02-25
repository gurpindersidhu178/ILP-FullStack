export class User {
  id: string;
  email: string;
  password: string;
  role: string;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // Hash the password before saving
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Validate password (for login)
  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password before saving to DB
UserSchema.pre('save', async function (next) {
  const user = this as User;
  if (!user.isModified('password')) return next();
  await user.hashPassword();
  next();
});

