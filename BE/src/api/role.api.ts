import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import APIError from "../utils/APIError";
import { Query, Params, Request } from "../configs/types";
import { Category, Role } from "../models";

export type IRole = {
  roleName: string;
  role: number;
};
export type ICategory = {
  name: number;
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
  static addCategory = async (
    req: Request<ICategory, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const r = await Category.findOne({ name: req.body.name });
      if (!!r) {
        throw new APIError({
          message: "Category is adready exist",
          status: httpStatus.BAD_REQUEST,
        });
      }
      await Category.create({
        name: req.body.name,
      });
      res.json({ status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
}
