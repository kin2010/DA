import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Course, Group, Lecture, Order, Section } from "../models";
import APIError from "../utils/APIError";

export type IOrder = {
  _id: string;
  user: string;
  courses: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  paidTime: string;
  id: string;
};
export type Tget = {
  id: string;
};

export type IUpdateOrder = { body: IOrder; id: string };
export default class OrderApi {
  static add = async (
    req: Request<IOrder, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const group = await (
        await Order.create({ ...req.body })
      ).populate([
        {
          path: "courses",
          select: "",
        },
      ]);

      res
        .json({
          data: group,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static update = async (
    req: Request<IOrder, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, ...other } = req.body;
      const out = await Order.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }
      const chapter = await await Order.findByIdAndUpdate(
        id,
        { ...other },
        {
          new: true,
        }
      );
      res
        .json({
          data: chapter,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static getById = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req?.params;
      const group = await Order.findById(id);
      if (!group) {
        throw new APIError({
          message: "NOT FOUND !",
          status: httpStatus.NOT_FOUND,
        });
      }
      const groupRes = await group.populate([
        {
          path: "courses",
          select: "",
          populate: [
            {
              path: "teachers",
              select: "",
            },
            {
              path: "users",
              select: "",
            },
          ],
        },
        {
          path: "user",
          select: "",
        },
      ]);
      res
        .json({
          data: groupRes,
          status: 200,
        })
        .status(httpStatus.OK)
        .end();
    } catch (error) {
      next(error);
    }
  };
  static getAllOrder = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit, skip } = req.query;
      const count = await Order.find({});
      const groups = await Order.find({})
        .limit(parseInt(limit as string))
        .skip(parseInt(skip as string))
        .sort({ createdAt: -1 })

        .populate([
          {
            path: "courses",
            select: "",
            populate: [
              {
                path: "teachers",
                select: "",
              },
              {
                path: "users",
                select: "",
              },
            ],
          },
          {
            path: "user",
            select: "",
          },
        ]);
      res
        .json({
          data: groups,
          status: 200,
          count: count,
        })
        .status(httpStatus.OK)
        .end();
    } catch (error) {
      next(error);
    }
  };
}
