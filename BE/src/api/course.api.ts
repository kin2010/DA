import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Chapter, Course, User } from "../models";
import APIError from "../utils/APIError";
import { pageParams } from ".";
export type IRequestCreateCourse = {
  teachers: string;
  users: any;
  name: string;
  sections: [
    {
      name: string;
      lectures: string[];
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
          path: "teachers",
          select: "",
        },
        {
          path: "teachers",
          select: "",
        },
        {
          path: "owner",
          select: "",
        },
        {
          path: "users",
          select: "",
        },
        {
          path: "sections",
          select: "",
          populate: [
            {
              path: "lectures",
              select: "",
            },
            {
              path: "assignments",
              select: "",
            },
            {
              path: "baitaps",
              select: "link status outdate time",
            },
          ],
        },
        {
          path: "category",
          select: "name",
        },
      ]);
      res.json({ data: course, status: 200 }).status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static getOne = async (
    req: Request<TGet, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new APIError({
          message: "NOT FOUND !",
          status: httpStatus.NOT_FOUND,
        });
      }
      const courseData = await Course.findById(id);
      if (!courseData) {
        throw new APIError({
          message: "NOT FOUND !",
          status: httpStatus.NOT_FOUND,
        });
      }
      const coursePopulate: any = await courseData.populate([
        {
          path: "teachers",
          select: "",
        },
        {
          path: "groups",
          select: "",
        },
        {
          path: "owner",
          select: "",
        },
        {
          path: "users",
          select: "",
        },
        {
          path: "sections",
          select: "",
          populate: [
            {
              path: "lectures",
              select: "",
            },
            {
              path: "assignments",
              select: "",
            },
            {
              path: "baitaps",
              select: "",
            },
          ],
        },
      ]);
      // const coures: any = Course.find({ _id: id })

      const sections: any = coursePopulate?.sections;
      const newSections = sections?.map((section: any) => {
        let combinedData: any = [];
        const lectures = section?.lectures || [];
        const assignments = section?.assignments || [];
        lectures?.map((lecture: any) => {
          combinedData?.push({
            type: "lecture",
            item: lecture,
            createdAt: lecture?.createdAt,
          });
        });
        assignments?.map((assignment: any) => {
          combinedData?.push({
            type: "assignment",
            item: assignment,
            createdAt: assignment?.createdAt,
          });
        });
        combinedData.sort((a: any, b: any) => a?.createdAt - b?.createdAt);
        return { section: section, data: combinedData };
      });
      coursePopulate.sections_info = newSections;
      res.json({ data: coursePopulate, status: 200 }).status(httpStatus.OK);
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
      const { id } = req.params;
      const out = await Course.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }
      const coures = await (
        await Course.findByIdAndUpdate(
          id,
          { ...req.body },
          {
            new: true,
          }
        )
      )?.populate([
        {
          path: "teachers",
          select: "",
        },
        {
          path: "owner",
          select: "",
        },
        {
          path: "users",
          select: "",
        },
        {
          path: "sections",
          select: "lectures baitaps",
          populate: [
            {
              path: "lectures",
              select: "",
            },
            {
              path: "assignments",
              select: "",
            },
            {
              path: "baitaps",
              select: "link status outdate time",
            },
          ],
        },
        // {
        //   path: "ralseHand",
        //   select: "time user",
        //   populate: {
        //     path: "user",
        //     select: "",
        //   },
        // },
        // {
        //   path: "plusMark",
        //   select: "time user",
        //   populate: {
        //     path: "user",
        //     select: "",
        //   },
        // },
      ]);
      res
        .json({
          data: coures,
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
      let coures: any = [];
      coures = await Course.findById(courseId);
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
          return !!role ? user?.role?.roleName === role : true;
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
  static allCourse = async (
    req: Request<pageParams, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { limit, skip } = req.query;
      const count = await Course.find({});
      const courses = await Course.find({})
        .limit(parseInt(limit as string))
        .skip(parseInt(skip as string))
        .sort({ createdAt: -1 })
        .populate([
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
            path: "sections",
            select: "",
            populate: [
              {
                path: "lectures",
                select: "",
              },
              {
                path: "assignments",
                select: "",
              },
              {
                path: "baitaps",
                select: "link status outdate time",
              },
            ],
          },
          {
            path: "owner",
            select: "",
          },
        ]);
      res
        .json({
          courses: courses,
          status: 200,
          count: count?.length,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
}
