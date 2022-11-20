"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class tokenMiddleware {
    constructor(tokenIn) {
        this.tokenIn = tokenIn;
    }
    checkTokenMiddleware(req, res, next) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                const e = new Error('Token inexistente');
                e.name = 'Unauthorized';
                throw e;
            }
            const data = this.tokenIn.checkToken(authorization);
            req.body.user = data;
            next();
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = tokenMiddleware;
