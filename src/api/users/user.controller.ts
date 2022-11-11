import {
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  Body,
  UsePipes,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { JoiValidationPipe } from '../../auth/joi.validation.pipe';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { RolesService } from '../roles/roles.service';
import { createUserScema } from './user.shema';
import { UsersService } from './users.service';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly service: UsersService, // private role: RolesService,
  ) {}

  // create user
  @Post()
  @UsePipes(new JoiValidationPipe(createUserScema))
  async signUp(@Body() userData, @Res() res: Response): Promise<any> {
    try {
      const savedUser = await this.service.signUp(userData);
      res.status(200).json(savedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get all users
  @Get()
  @UseGuards(JwtAuthGuard)
  async loadAllUsers(@Req() req, @Res() res: Response): Promise<any> {
    try {
      const users = await this.service.getAllUsers();
      res.json({ data: users });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get user by id
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserByid(@Param('id') id: string, res: Response): Promise<any> {
    try {
      const user = await this.service.getUserById(id);
      res.json({ item: user });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }
}
