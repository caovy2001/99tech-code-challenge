import { Request, Response, NextFunction } from "express";
import { CommonReponse } from "../responses/common.response";

export class AppError extends Error {
  public statusCode: number;
  public data?: any;

  constructor(message: string, statusCode: number = 500, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error for debugging
  console.error(`[${new Date().toISOString()}] Error:`, {
    message: err.message,
    stack: process.env.NODE_ENV === "dev" ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });

  // Handle known AppError
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json(CommonReponse.of(err.data || null, false, err.message));
    return;
  }

  // Handle "not found" errors (404)
  if (err.message === "User not found") {
    res.status(404).json(CommonReponse.of(null, false, "User not found"));
    return;
  }

  // Handle validation errors (400)
  if (err.name === "ValidationError") {
    res.status(400).json(CommonReponse.of(null, false, err.message));
    return;
  }

  // Default 500 error for unknown server errors
  res
    .status(500)
    .json(
      CommonReponse.of(
        null,
        false,
        process.env.NODE_ENV === "prod" ? "Internal server error" : err.message
      )
    );
};
