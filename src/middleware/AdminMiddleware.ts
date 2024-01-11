import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

interface RequestWithUser extends Request {
  user: User;
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
