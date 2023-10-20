"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCheckMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
let RoleCheckMiddleware = class RoleCheckMiddleware {
    use(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decodedToken = (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY || 'some_jwt_access_secret');
            req['user'] = decodedToken;
        }
        catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const { roles } = req['user']['userData'];
        const requiredRole = Reflect.getMetadata('role', req.route.path);
        if (!roles.includes(requiredRole)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }
};
exports.RoleCheckMiddleware = RoleCheckMiddleware;
exports.RoleCheckMiddleware = RoleCheckMiddleware = __decorate([
    (0, common_1.Injectable)()
], RoleCheckMiddleware);
//# sourceMappingURL=role-check.middleware.js.map