import { ErrorRequestHandler } from "express";
import { AppException } from "../../../shared/core/AppException";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const meta: { status: number; errcode?: string } = { status: 0 };
  if (err instanceof AppException) {
    meta.errcode = err.code;
    return res.json({ meta });
  }

  console.error(err);
  meta.errcode = "unexpcted_error";
  return res.json({ meta });
};
