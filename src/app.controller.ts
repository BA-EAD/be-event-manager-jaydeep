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
  // @UseGuards(LocalAuthGuarde)
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

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): any {
    return req.user;
  }
  @Post('file')
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const uniqecon = Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `${uniqecon}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    return { status: 200, mesage: 'file uploaded' };
  }
}
