import express from "express";

export const catchAsync =
  (
    fn: (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => Promise<express.Response>
  ) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
