import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};
    error.issues.forEach((e) => {
      const field = e.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = e.message;
      }
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: fieldErrors,
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

export default errorHandler;
