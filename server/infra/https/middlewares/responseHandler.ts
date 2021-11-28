import express from "express";

const SUCCESS_CODE = 200;
const STATUS = { OK: 1, NG: 0 };

export const responseHandler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  res.ok = (args) => {
    const baseMeta = { status: STATUS.OK };
    if (args?.meta) {
      Object.assign(baseMeta, args.meta);
    }
    return res
      .status(SUCCESS_CODE)
      .json({ meta: baseMeta, payload: args?.payload });
  };
  res.ng = (errcode: string) => {
    return res.json({ meta: { status: STATUS.NG, errcode } });
  };
  next();
};
