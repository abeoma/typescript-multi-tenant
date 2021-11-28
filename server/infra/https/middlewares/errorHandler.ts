import { AppException } from "../../../shared/core/AppException";
import { ErrorRequestHandler } from "express";

// eslint-disable-next-line max-params
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const meta: { status: number; errcode?: string } = { status: 0 };
  if (err instanceof AppException) {
    meta.errcode = err.code;
    return res.json({ meta });
  }

  // eslint-disable-next-line no-console
  console.error(err);
  meta.errcode = "unexpcted_error";
  return res.json({ meta });
};
