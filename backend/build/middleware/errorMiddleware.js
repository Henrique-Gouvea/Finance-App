"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorMiddleware = (err, _req, res, _next) => {
    const { name, message } = err;
    console.log(name);
    console.log('error middleware');
    switch (name) {
        case 'ValidationError':
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ message });
            break;
        case 'Unauthorized':
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message });
            break;
        case 'NotFound':
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message });
            break;
        default:
            res.sendStatus(500);
    }
};
exports.default = errorMiddleware;
