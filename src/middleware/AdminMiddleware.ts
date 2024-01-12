import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IUser } from 'src/interfaces';

interface RequestWithUser extends Request {
  user: IUser;
}

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    if (!req.user) {
      throw new UnauthorizedException('No user found in request.');
    }

    if (!req.user.isAdmin) {
      res.status(403).json({ message: 'Forbidden. Admin access is required.' });
      return;
    }

    next();
  }
}
