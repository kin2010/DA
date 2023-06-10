import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import APIError from "../utils/APIError";
import { Query, Params, Request } from "../configs/types";
import { Category, CategoryGroup, Role } from "../models";

export type IRole = {
  roleName: string;
  role: number;
};
export type ICategory = {
  name: number;
  group: string;
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
      const { name, group } = req.body;
      const r = await Category.findOne({ name: req.body.name });
      if (!group) {
        throw new APIError({
          message: "Please choose a category group",
          status: httpStatus.BAD_REQUEST,
        });
      }
      if (!!r) {
        throw new APIError({
          message: "Category is adready exist",
          status: httpStatus.BAD_REQUEST,
        });
      }
      const cate = await Category.create({
        name: name,
        group: group,
      });
      res.json({ data: cate, status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
  static addCategoryGroup = async (
    req: Request<ICategory, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const r = await CategoryGroup.findOne({ name: req.body.name });
      if (!!r) {
        throw new APIError({
          message: "Category Group is adready exist",
          status: httpStatus.BAD_REQUEST,
        });
      }
      const groups = await CategoryGroup.create({
        name: req.body.name,
      });
      res.json({ data: groups, status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
  static getCategory = async (
    req: Request<ICategory, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categorys = await Category.aggregate([
        {
          $lookup: {
            from: "category_groups",
            localField: "group",
            foreignField: "_id",
            as: "group",
          },
        },
        {
          $unwind: "$group",
        },
        {
          $group: {
            _id: "$group",
            categories: { $push: "$$ROOT" },
          },
        },
      ]);
      res.json({ data: categorys, status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
}
