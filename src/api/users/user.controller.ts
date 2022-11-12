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
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { createUserScema } from './user.shema';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@ApiBearerAuth()
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly service: UsersService, // private role: RolesService,
  ) {}

  // create user
  @ApiOperation({
    operationId: 'Register User',
    summary: 'Create an user account.',
  })
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
  @ApiOperation({
    operationId: 'Get All User list',
    summary: 'Get all user list',
  })
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
  @ApiOperation({
    operationId: 'Get user by id',
    summary: 'Get user from id',
  })
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
