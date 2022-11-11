import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  constructor() {} // private readonly firebaseApp: FirebaseApp

  public async use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    try {
      // req['identity'] = await this.firebaseApp.getIdentityOrFail(token);
      req['identity'] = token;
      next();
    } catch (e) {
      console.log('error', e);
      this.throwAccessDeniedMotherfucker(req.url, res);
    }
  }

  private throwAccessDeniedMotherfucker(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toDateString(),
      path: url,
      message: 'access denied',
    });
  }
}
