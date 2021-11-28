import { AppException } from "../../../shared/core/AppException";
import { ErrorRequestHandler } from "express";

// eslint-disable-next-line max-params
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppException) {
    return res.ng(err.code);
  }

  // eslint-disable-next-line no-console
  console.error(err);
  return res.ng("unexpcted_error");
};
