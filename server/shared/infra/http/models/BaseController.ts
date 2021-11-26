/* eslint-disable no-magic-numbers */
/* eslint-disable class-methods-use-this */

import * as express from "express";
import { validationResult } from "express-validator";

type Meta = { status: number } & Record<string, unknown>;

export abstract class BaseController {
  public static jsonResponse(
    res: express.Response,
    code: number,
    message: string
  ): express.Response {
    return res.status(code).json({ message });
  }

  public ok(res: express.Response, payload?: unknown): express.Response {
    const meta: Meta = { status: 1 };
    if (payload) {
      res.type("application/json");
      return res.status(200).json({ payload, meta });
    }
    return res.status(200).json({ meta });
  }

  public created(res: express.Response): express.Response {
    return res.sendStatus(201);
  }

  public clientError(
    res: express.Response,
    message?: string
  ): express.Response {
    return BaseController.jsonResponse(res, 400, message || "Unauthorized");
  }

  public unauthorized(
    res: express.Response,
    message?: string
  ): express.Response {
    return BaseController.jsonResponse(res, 401, message || "Unauthorized");
  }

  public forbidden(res: express.Response, message?: string): express.Response {
    return BaseController.jsonResponse(res, 403, message || "Forbidden");
  }

  public notFound(res: express.Response, message?: string): express.Response {
    return BaseController.jsonResponse(res, 404, message || "Not found");
  }

  public conflict(res: express.Response, message?: string): express.Response {
    return BaseController.jsonResponse(res, 409, message || "Conflict");
  }

  public tooMany(res: express.Response, message?: string): express.Response {
    return BaseController.jsonResponse(
      res,
      429,
      message || "Too many requests"
    );
  }

  // eslint-disable-next-line consistent-return
  public execValidation(
    req: express.Request,
    res: express.Response
  ): void | express.Response {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .json({ message: "InvalidRequestParams", errors: errors.mapped() });
    }
  }
}
