import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModule: Model<User>) {}

  // find user by email
  async findOne(email: string): Promise<User> {
    return await this.UserModule.findOne({ email: email })
      .populate('role')
      .exec();
  }

  /// create user
  async signUp(user: User): Promise<User> {
    const newUser = new this.UserModule(user);
    return await newUser.save();
  }

  // get all users
  async getAllUsers() {
    return await this.UserModule.find().exec();
  }

  // get user by id
  async getUserById(id: string): Promise<User> {
    return await this.UserModule.findOne({ _id: id }).exec();
  }
}
