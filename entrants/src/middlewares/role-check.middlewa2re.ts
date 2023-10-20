// role-check.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class RoleCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Ваш код валидации токена, например, с использованием библиотеки jsonwebtoken
    try {
      const decodedToken = verify(
        token,
        process.env.JWT_KEY || 'some_jwt_access_secret',
      );
      req['user'] = decodedToken; // Добавление расшифрованного токена в объект запроса
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Проверка на наличие указанной роли
    const { roles } = req['user']['userData'];
    const requiredRole = Reflect.getMetadata('role', req.route.path);

    if (!roles.includes(requiredRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  }
}
