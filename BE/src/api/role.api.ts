import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import APIError from "../utils/APIError";
import { Query, Params, Request } from "../configs/types";
import { Role, User } from "../models";

import JWT from "../utils/jwt";

export type IRole = {
  roleName: string;
  role: number;
};

export default class RoleService {
  static addRole = async (
    req: Request<IRole, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const r = await Role.findOne({ roleName: req.body.roleName });
      if (!!r) {
        throw new APIError({
          message: "Role is adready exist",
          status: httpStatus.BAD_REQUEST,
        });
      }
      await Role.create({
        roleName: req.body.roleName,
        role: parseInt(req.body.role as unknown as string),
      });
      res.json({ status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
}
