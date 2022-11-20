import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const { status, message } = err;

  if (status) {
    res.status(status).json({ message });
  } else res.sendStatus(500);
};

export default errorMiddleware;
