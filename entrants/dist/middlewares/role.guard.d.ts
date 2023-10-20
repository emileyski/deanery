import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RoleGuard implements CanActivate {
    private readonly requiredRole;
    constructor(requiredRole: string);
    canActivate(context: ExecutionContext): boolean;
}
