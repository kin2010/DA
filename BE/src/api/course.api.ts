import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Chapter, Course, User } from "../models";
import APIError from "../utils/APIError";
export type IRequestCreateCourse = {
  teachers: string;
  users: any;
  name: string;
  chapter: [
    {
      name: string;
      lessions: string[];
      baitaps: string[];
    }
  ];
  start: Date;
  end: Date;
  description: {
    mota?: string;
    yeucau?: string;
    ketqua?: string;
    doituong?: string;
  };
  price: Number;
  status: string;
  image: String;
};

export type TGet = {
  id: string;
};
export type IUpdate = {
  body: IRequestCreateCourse;
  id: string;
};
export type IGetByRole = {
  role?: string;
  courseId?: string;
};
export default class CourseApi {
  static create = async (
    req: Request<IRequestCreateCourse, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const course = await (
        await Course.create({ ...req.body })
      ).populate([
        {
          path: "teacher",
          select: "fullName",
        },
        {
          path: "users",
          select: "avatar email fullName address phone online",
        },
        {
          path: "chapter",
          select: "lessions baitaps",
          populate: [
            {
              path: "lessions",
              select: "view time users",
            },
            {
              path: "baitaps",
              select: "link status outdate time",
            },
          ],
        },
      ]);
      res.json({ course, status: 200 }).status(httpStatus.OK);
    } catch (error) {
      next();
    }
  };
  static getOne = async (
    req: Request<TGet, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      console.log("id: " + id);
      const coures = await Course.findById(id);
      if (!coures) {
        throw new APIError({
          message: "NOT FOUND !",
          status: httpStatus.NOT_FOUND,
        });
      }

      const cc = await coures.populate([
        {
          path: "teacher",
          select: "fullName",
        },
        {
          path: "users",
          select: "avatar email fullName address phone online",
        },
        {
          path: "chapter",
          select: "lessions baitaps",
          populate: [
            {
              path: "lessions",
              select: "view time users",
            },
            {
              path: "baitaps",
              select: "link status outdate time",
            },
          ],
        },
      ]);
      res.json({ course: cc, status: 200 }).status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static update = async (
    req: Request<IUpdate, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { body, id } = req.body as IUpdate;
      const out = await Course.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }
      console.log(body);
      const coures = await (
        await Course.findByIdAndUpdate(id, body, {
          new: true,
        })
      )?.populate([
        {
          path: "teacher",
          select: "avatar email fullName address phone online",
        },
        {
          path: "users",
          select: "avatar email fullName address phone online",
        },
        // {
        //   path: "ralseHand",
        //   select: "time user",
        //   populate: {
        //     path: "user",
        //     select: "avatar email fullName address phone online",
        //   },
        // },
        // {
        //   path: "plusMark",
        //   select: "time user",
        //   populate: {
        //     path: "user",
        //     select: "avatar email fullName address phone online",
        //   },
        // },
      ]);
      res
        .json({
          course: coures,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static getByRole = async (
    req: Request<IGetByRole, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { role, courseId } = req.query;
      const coures = await Course.findById(courseId);
      let courseUsers: any[] = [];
      if (!!coures) {
        courseUsers = coures?.users;
      }
      const users = await User.aggregate([
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
      ]);

      const dt = users
        ?.filter((user) => {
          console.log(user?.role?.roleName);
          return user?.role?.roleName === role;
        })
        ?.map((user) => {
          return { ...user, enrolled: !!courseUsers?.includes(user?._id) };
        });

      res
        .json({
          users: dt,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
}
