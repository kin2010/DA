import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import APIError from "../utils/APIError";
import { Query, Params, Request } from "../configs/types";
import {
  Assignment,
  Category,
  CategoryGroup,
  Course,
  Group,
  Lecture,
  Order,
  Role,
  Section,
} from "../models";
import mongoose, { Mongoose } from "mongoose";

export type IRole = {
  roleName: string;
  role: number;
};
export type ICategory = {
  name: number;
  group: string;
  id: string;
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
  static updateCategory = async (
    req: Request<ICategory, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, ...other } = req.body;
      const r = await Category.findByIdAndUpdate(
        id,
        { ...other },
        { new: true }
      );
      // if (!group) {
      //   throw new APIError({
      //     message: "Please choose a category group",
      //     status: httpStatus.BAD_REQUEST,
      //   });
      // }

      res.json({ data: r, status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
  static updateCategoryGroup = async (
    req: Request<ICategory, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, ...other } = req.body;
      const r = await CategoryGroup.findByIdAndUpdate(
        id,
        { ...other },
        { new: true }
      );
      // if (!group) {
      //   throw new APIError({
      //     message: "Please choose a category group",
      //     status: httpStatus.BAD_REQUEST,
      //   });
      // }

      res.json({ data: r, status: 200 }).end();
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
  static getAllCategory = async (
    req: Request<ICategory, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categorys = await Category.find({}).populate([
        {
          path: "group",
          select: "",
        },
      ]);

      res.json({ data: categorys, status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
  static getAllCategoryGroup = async (
    req: Request<ICategory, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const categorys = await CategoryGroup.find({});

      res.json({ data: categorys, status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
  static deleteDocument = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { type, id } = req.query;
      console.log(req.query);
      let rs: any;
      switch (type) {
        case "category":
          rs = await Category.deleteOne({ _id: id });
          break;
        case "category-group":
          rs = await CategoryGroup.deleteOne({ _id: id });
          break;
        case "group":
          rs = await Group.deleteOne({ _id: id });
          break;
        case "section":
          rs = await Section.deleteOne({ _id: id });
          break;
        case "lecture":
          rs = await Lecture.deleteOne({ _id: id });
          break;
        case "assignment":
          rs = await Assignment.deleteOne({ _id: id });
          break;
        case "course":
          rs = await Course.deleteOne({ _id: id });
          break;
        case "order":
          rs = await Order.deleteOne({ _id: id });
          break;

        default:
          break;
      }

      res.json({ data: rs, status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
}
