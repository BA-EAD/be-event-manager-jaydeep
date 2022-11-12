import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly appService: AuthService) {}

  @ApiTags('Login')
  @ApiOperation({
    operationId: 'Login User',
    summary: 'Login an user account.',
  })
  @Post('v1/login')
  async login(@Request() req, @Res() res: Response): Promise<any> {
    const isLogin = await this.appService.login(req.body);
    if (!isLogin) {
      return res.status(401).json({
        status: 'error',
        code: 'unauthorized',
        message: 'Wrong password',
      });
    } else {
      return res.status(200).json(isLogin);
    }
  }
}
