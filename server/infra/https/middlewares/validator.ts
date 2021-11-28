import { ValidationError, validationResult } from "express-validator";
import { AppException } from "./../../../shared/core/AppException";
import express from "express";

export const execValidation = (
  req: express.Request,
  _res: express.Response
): void => {
  const errorFormatter = ({
    location,
    msg,
    param,
    value: _1,
    nestedErrors: _2,
  }: ValidationError) => {
    return `${location}[${param}]: ${msg}`;
  };
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    throw new AppException("invalid-request-params", errors.array().join(","));
  }
};
