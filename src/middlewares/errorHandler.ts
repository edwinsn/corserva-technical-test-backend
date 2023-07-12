import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  if (err.expose === true) {
    res.status(err.status || 500).send(err);
  } else {
    res.status(500).send(createError.InternalServerError());
  }
};

export default errorHandler;
