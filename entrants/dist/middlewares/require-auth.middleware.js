"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizatedMiddleware = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthorizatedMiddleware = class AuthorizatedMiddleware {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return false;
        }
        try {
            const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY || 'some_jwt_access_secret');
            request.user = decodedToken['userData'];
            request.userId = decodedToken['userData'].id;
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.AuthorizatedMiddleware = AuthorizatedMiddleware;
exports.AuthorizatedMiddleware = AuthorizatedMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthorizatedMiddleware);
//# sourceMappingURL=require-auth.middleware.js.map