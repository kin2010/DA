import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Course, Group, Lecture, Order, Section, User } from "../models";
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
              {
                path: "category",
                select: "",
              },
              {
                path: "comments",
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
      console.log(req.query);
      let starttime1: any = null;
      let endtime1: any = null;
      let starttime2: any = null;
      let endtime2: any = null;
      if (type === "month") {
        starttime1 = startOfMonth(new Date(start));
        endtime1 = endOfMonth(new Date(start));
        starttime2 = startOfMonth(new Date(end));
        endtime2 = endOfMonth(new Date(end));
      }
      if (type === "year") {
        starttime1 = startOfYear(new Date(start));
        endtime1 = endOfYear(new Date(start));
        starttime2 = startOfYear(new Date(end));
        endtime2 = endOfYear(new Date(end));
      }
      if (type === "week") {
        starttime1 = startOfWeek(new Date(start));
        endtime1 = endOfWeek(new Date(start));
        starttime2 = startOfWeek(new Date(end));
        endtime2 = endOfWeek(new Date(end));
      }
      let response: any = "";
      console.log(starttime1, endtime1);
      // const dt = await Order.aggregate([
      //   {
      //     $match: {
      //       createdAt: {
      //         $gte: starttime1,
      //         $lt: endtime1,
      //       },
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "courses", // Name of the collection containing the courses
      //       localField: "courses",
      //       foreignField: "_id",
      //       as: "course_data",
      //     },
      //   },
      //   {
      //     $project: {
      //       total: 1,
      //       year: { $year: { date: "$createdAt" } },
      //       // month: { $month: { date: "$createdAt" } },
      //       day: { $dayOfMonth: { date: "$createdAt" } },
      //       // hour: { $hour: { date: "$createdAt" } },
      //       // week: { $isoWeek: "$createdAt" },
      //       createdAt: "$createdAt",
      //       courses: 1,
      //       course_data: 1,
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: "$day",
      //       day: { $push: "$day" },
      //       total: { $sum: "$total" },
      //       data: { $push: "$$ROOT" },
      //     },
      //   },

      //   {
      //     $sort: {
      //       "_id.year": 1,
      //       "_id.month": 1,
      //       "_id.day": 1,
      //       "_id.hour": 1,
      //     },
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       months: {
      //         $range: [1, 13],
      //       },
      //       totals: {
      //         $map: {
      //           input: {
      //             $range: [1, 13],
      //           },
      //           as: "month",
      //           in: {
      //             $arrayElemAt: [
      //               "$day",
      //               {
      //                 $indexOfArray: ["$months", "$$month"],
      //               },
      //             ],
      //           },
      //         },
      //       },
      //     },
      //   },
      // ]);
      let dt: any = "";
      let count = await User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: starttime1,
              $lt: endtime1,
            },
          },
        },
      ]);
      if (type === "year") {
        dt = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: starttime1,
                $lt: endtime1,
              },
            },
          },
          {
            $group: {
              _id: { $month: "$createdAt" },
              total_price: { $sum: "$total" },
            },
          },
          {
            $group: {
              _id: null,
              data: {
                $push: {
                  time: "$_id",
                  total_price: "$total_price",
                },
              },
            },
          },

          // {
          //   $project: {
          //     _id: 0,
          //     month: {
          //       $range: [1, 13],
          //     },
          //     total_price: {
          //       $map: {
          //         input: { $range: [1, 13] },
          //         as: "m",
          //         in: {
          //           $cond: [
          //             { $in: ["$$m", "$data.month"] },
          //             {
          //               $arrayElemAt: [
          //                 {
          //                   $filter: {
          //                     input: "$data",
          //                     cond: { $eq: ["$$this.month", "$$m"] },
          //                   },
          //                 },
          //                 0,
          //               ],
          //             },
          //             { month: "$$m", total_price: 0 },
          //           ],
          //         },
          //       },
          //     },
          //   },
          // },
          // {
          //   $unwind: "$total_price",
          // },
          // {
          //   $replaceRoot: {
          //     newRoot: {
          //       $mergeObjects: ["$total_price", { month: "$total_price.month" }],
          //     },
          //   },
          // },
          {
            $sort: {
              "data.time": -1,
            },
          },
        ]);
      } else {
        dt = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: starttime1,
                $lt: endtime1,
              },
            },
          },
          {
            $group: {
              _id: { $dayOfMonth: "$createdAt" },
              total_price: { $sum: "$total" },
            },
          },
          {
            $group: {
              _id: null,
              data: {
                $push: {
                  time: "$_id",
                  total_price: "$total_price",
                },
              },
            },
          },
          {
            $sort: {
              time: 1,
            },
          },
        ]);
      }
      res
        .json({
          data: { ...dt[0], count: count?.length || 0 },
          status: 200,
        })
        .status(httpStatus.OK)
        .end();
    } catch (error) {
      next(error);
    }
  };
}
