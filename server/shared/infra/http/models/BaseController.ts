import * as express from "express";
import { validationResult } from "express-validator";

export abstract class BaseController<ErrorCode> {
  public static jsonResponse(
    res: express.Response,
    code: number,
    message: string
  ): express.Response {
    return res.status(code).json({ message });
  }

  public ok<T>(res: express.Response, dto?: T): express.Response {
    if (dto) {
      res.type("application/json");
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: express.Response): express.Response {
    return res.sendStatus(201);
  }

  public clientError(
    res: express.Response,
    message?: string
  ): express.Response {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : "Unauthorized"
    );
  }

  public unauthorized(
    res: express.Response,
    message?: string
  ): express.Response {
    return BaseController.jsonResponse(
      res,
      401,
      message ? message : "Unauthorized"
    );
  }

  public forbidden(res: express.Response, message?: string): express.Response {
    return BaseController.jsonResponse(
      res,
      403,
      message ? message : "Forbidden"
    );
  }

  public notFound(res: express.Response, message?: string): express.Response {
    return BaseController.jsonResponse(
      res,
      404,
      message ? message : "Not found"
    );
  }

  public conflict(res: express.Response, message?: string): express.Response {
    return BaseController.jsonResponse(
      res,
      409,
      message ? message : "Conflict"
    );
  }

  public tooMany(res: express.Response, message?: string): express.Response {
    return BaseController.jsonResponse(
      res,
      429,
      message ? message : "Too many requests"
    );
  }

  public fail(res: express.Response, errcode: ErrorCode): express.Response {
    return res.json({
      meta: { status: 0, errcode: errcode },
    });
  }

  public execValidation(
    req: express.Request,
    res: express.Response
  ): void | express.Response {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "InvalidRequestParams",
        errors: errors.mapped(),
      });
    }
  }
}
