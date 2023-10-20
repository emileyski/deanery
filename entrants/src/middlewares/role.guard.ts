// role.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly requiredRole: string) {}

  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest()['user'];

    // console.log(user);
    if (user && user.roles.includes(this.requiredRole)) {
      return true;
    }

    return false;
  }
}
