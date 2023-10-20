// user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

export const GetUser = createParamDecorator(
  async (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request.headers.authorization);
    if (!token) {
      return null;
    }

    try {
      const decodedToken = await validateToken(token);
      return decodedToken.userData;
    } catch {
      return null;
    }
  },
);

function extractTokenFromHeader(authorizationHeader: string): string | null {
  if (!authorizationHeader) {
    return null;
  }

  const parts = authorizationHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

async function validateToken(token: string): Promise<any> {
  const decoded = verify(
    token,
    process.env.JWT_KEY || 'some_jwt_access_secret',
  );
  return decoded;
}
