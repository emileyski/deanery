"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.GetUser = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request.headers.authorization);
    if (!token) {
        return null;
    }
    try {
        const decodedToken = await validateToken(token);
        return decodedToken.userData;
    }
    catch {
        return null;
    }
});
function extractTokenFromHeader(authorizationHeader) {
    if (!authorizationHeader) {
        return null;
    }
    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }
    return parts[1];
}
async function validateToken(token) {
    const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY || 'some_jwt_access_secret');
    return decoded;
}
//# sourceMappingURL=user.decorator.js.map