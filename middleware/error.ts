import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //   Wrong mongoDB Id
  if (ErrorHandler.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Dupluicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }
  //   Wrong JWT Token error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try again";
    err = new ErrorHandler(message, 400);
  }
  //   JWT Token expired error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is expired. Try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
