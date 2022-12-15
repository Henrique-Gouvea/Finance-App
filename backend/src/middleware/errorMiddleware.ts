/* eslint-disable max-lines-per-function */
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;

  switch (name) {
    case 'BadRequest':
      res.status(StatusCodes.BAD_REQUEST).json({ message });
      break;
    case 'Conflict':
      res.status(StatusCodes.CONFLICT).json({ message });
      break;
    case 'Unauthorized':
      res.status(StatusCodes.UNAUTHORIZED).json({ message });
      break;
    case 'NotFound':
      res.status(StatusCodes.NOT_FOUND).json({ message });
      break;
    case 'ValidationError':
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message });
      break;

    default:
      res.sendStatus(500);
  }
};

export default errorMiddleware;
