import express from "express";

const SUCCESS_CODE = 200;

export const responseHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  res.ok = (args) => {
    const baseMeta = { status: 1 };
    if (args?.meta) {
      Object.assign(baseMeta, args.meta);
    }
    return res
      .status(SUCCESS_CODE)
      .json({ meta: baseMeta, payload: args?.payload });
  };
  next();
};
