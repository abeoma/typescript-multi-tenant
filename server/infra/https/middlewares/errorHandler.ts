import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res
    .json({
      meta: { status: 0, errcode: "unexpcted_error" },
    })
    .send();
};
