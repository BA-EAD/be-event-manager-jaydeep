import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  HttpException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { AccountService } from '../api/account/account.service';

@Injectable()
export class PermissionMiddleware implements NestMiddleware {
  constructor() {} // private readonly accountService: AccountService

  public async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req['identity'];

      // let user = await this.accountService.findOne(id);
      let user = {};

      // if (!user['permissions'].includes('set-tag')) {
      //   throw new HttpException('access denied', HttpStatus.FORBIDDEN);
      // }

      next();
    } catch (error) {
      this.throwAccessDeniedMotherfucker(req.url, res, error);
    }
  }

  private throwAccessDeniedMotherfucker(
    url: string,
    res: Response,
    error: HttpException,
  ) {
    res.status(error.getStatus()).json({
      statusCode: error.getStatus(),
      timestamp: new Date().toDateString(),
      path: url,
      message: error.getResponse(),
    });
  }
}
