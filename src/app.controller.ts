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
import { JwtAuthGuard } from './auth/jwt-auth-guard';
// import { LocalAuthGuarde } from './auth/local-auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AuthService) {}

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
