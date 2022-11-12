import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRole } from './role.model';
@Injectable()
export class RolesService {
  constructor(
    @InjectModel('Roles') private readonly RoleModule: Model<UserRole>,
  ) {}

  async create(name: string, type: string, permission: any): Promise<UserRole> {
    const newRole = new this.RoleModule({
      name,
      type,
      permission,
    });
    const resopn: any = await newRole.save();
    return resopn;
  }

  async update(id: any, name, type, permission): Promise<UserRole> {
    const updateRole = await this.findOne(id);
    if (name) {
      updateRole.name = name;
    }
    if (type) {
      updateRole.type = type;
    }
    if (permission) {
      updateRole.permission = permission;
    }
    updateRole.save();
    return;
  }
  async getAll() {
    return await this.RoleModule.find().exec();
  }
  async getRoleByName(types: string) {
    return await this.RoleModule.find({ type: types }).exec();
  }
  async getById(id: string): Promise<UserRole> {
    const result = await this.findOne(id);
    if (result) return result;
    else return null;
  }
  async delete(id: any) {
    const prod = await this.findOne(id);
    if (prod) {
      let res = await this.RoleModule.deleteOne({ _id: id }).exec();
    }
    return null;
  }

  private async findOne(id: string): Promise<UserRole> {
    var result;
    try {
      result = await this.RoleModule.findOne({ _id: id }).exec();
      if (!result) {
        throw new NotFoundException('Could not found.');
      }
      return result;
    } catch (error) {}
    if (!result) {
      throw new NotFoundException('Could not found.');
    } else return result;
  }
}
