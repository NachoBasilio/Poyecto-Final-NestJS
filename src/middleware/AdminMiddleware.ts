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
    // Primero, verifica si el objeto de usuario existe en la solicitud.
    if (!req.user) {
      // Si no existe, lanza una excepción. Esto detendrá la ejecución y enviará una respuesta de error al cliente.
      throw new UnauthorizedException('No user found in request.');
    }

    // Luego, verifica si el usuario es un administrador.
    if (!req.user.isAdmin) {
      // Si no es un administrador, envía una respuesta de error al cliente.
      res.status(403).json({ message: 'Forbidden. Admin access is required.' });
      return;
    }

    // Si el usuario es un administrador, llama a `next()` para continuar con el siguiente middleware o controlador.
    next();
  }
}
