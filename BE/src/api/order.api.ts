import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Course, Group, Lecture, Order, Section } from "../models";
import APIError from "../utils/APIError";
import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

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
  static revenue = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit, skip, start, end, type } = req.query;
      let starttime1: any = null;
      let endtime1: any = null;
      let starttime2: any = null;
      let endtime2: any = null;
      if (type === "month") {
        starttime1 = startOfMonth(new Date(start)).toISOString();
        endtime1 = endOfMonth(new Date(start)).toISOString();
        starttime2 = startOfMonth(new Date(end)).toISOString();
        endtime2 = endOfMonth(new Date(end)).toISOString();
      }
      if (type === "year") {
        starttime1 = startOfYear(new Date(start)).toISOString();
        endtime1 = endOfYear(new Date(start)).toISOString();
        starttime2 = startOfYear(new Date(end)).toISOString();
        endtime2 = endOfYear(new Date(end)).toISOString();
      }
      if (type === "week") {
        starttime1 = startOfWeek(new Date(start)).toISOString();
        endtime1 = endOfWeek(new Date(start)).toISOString();
        starttime2 = startOfWeek(new Date(end)).toISOString();
        endtime2 = endOfWeek(new Date(end)).toTimeString();
      }
      let response = null;
      if (type === "week") {
        Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: starttime1,
                $lt: endtime1,
              },
            },
          },
          // {
          //   $project: {
          //     total: 1,
          //     year: { $year: { date: "$createdAt" } },
          //     month: { $month: { date: "$createdAt" } },
          //     day: { $dayOfMonth: { date: "$createdAt" } },
          //     hour: { $hour: { date: "$createdAt" } },
          //     week: { $isoWeek: "$createdAt" },
          //     dayOfWeek: { $dayOfWeek: new Date(start) },
          //   },
          // },
          // {
          //   $group: {
          //     _id: {
          //       year: "$year",
          //       day: "$day",
          //     },
          //     total: { $sum: "$total" },
          //     data: { $push: "$$ROOT" },
          //   },
          // },
          // {
          //   $sort: {
          //     "_id.year": 1,
          //     "_id.month": 1,
          //     "_id.day": 1,
          //     "_id.hour": 1,
          //   },
          // },
        ]).exec((err, result) => {
          console.log(result);
          response = result;
        });
      }

      // const order = await Order.find({
      //   createdAt: {
      //     $gte: starttime1,
      //     $lte: endtime1,
      //   },
      // })?.populate([
      //   {
      //     path: "courses",
      //     select: "",
      //   },
      //   {
      //     path: "user",
      //     select: "",
      //   },
      // ]);
      const order2 = await Order.find({
        createdAt: {
          $gte: starttime2,
          $lte: endtime2,
        },
      })?.populate([
        {
          path: "courses",
          select: "",
        },
        {
          path: "user",
          select: "",
        },
      ]);

      res
        .json({
          data: order2,
          status: 200,
        })
        .status(httpStatus.OK)
        .end();
    } catch (error) {
      next(error);
    }
  };
}
