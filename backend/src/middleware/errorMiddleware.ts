import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  console.log(name);
  console.log('error middleware');

  switch (name) {
    case 'ValidationError':
      res.status(StatusCodes.BAD_REQUEST).json({ message });
      break;
    case 'Unauthorized':
      res.status(StatusCodes.UNAUTHORIZED).json({ message });
      break;
    case 'NotFound':
      res.status(StatusCodes.NOT_FOUND).json({ message });
      break;
    default:
      res.sendStatus(500);
  }
};

export default errorMiddleware;
