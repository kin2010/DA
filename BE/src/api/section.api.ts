import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import APIError from "../utils/APIError";
import { Query, Params, Request } from "../configs/types";
import { Course, Section } from "../models";
import { IRequestLecture } from "./lession.api";

export type ISection = {
  name: string;
};
export type Ichapter = {
  idChapter: string;
  course: string;
  name: string;
  lessions: string[];
  baitaps: string[];
  mota: string;
};
export type Tget = {
  id: string;
};
export type IUpdate = {
  body: IRequestLecture;
  id: string;
};
export default class SectionService {
  static update = async (
    req: Request<Ichapter, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { ...other } = req.body;
      const out = await Section.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }
      const chapter = await (
        await Section.findByIdAndUpdate(
          id,
          { ...other },
          {
            new: true,
          }
        )
      )?.populate([
        {
          path: "lessions",
          select: "teacher mota",
        },
      ]);
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
  static add = async (
    req: Request<Ichapter, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { course, ...other } = req?.body;
      const cc = await Course.findById(course);
      if (!cc) {
        throw new APIError({
          message: "Course id is required",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const data = {
        ...other,
        course: course,
      };
      const section = await (
        await Section.create({ ...data })
      )?.populate([
        {
          path: "lessions",
          select: "teachers mota",
        },
      ]);
      console.log([...cc.sections, section?._id]);
      await cc.update({
        sections: [...cc.sections, section?._id],
      });
      res
        .json({
          data: section,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static getChapters = async (
    req: Request<Ichapter, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { idCourse } = req?.query;
      const cc = await Course.findById(idCourse);
      if (!cc) {
        throw new APIError({
          message: "Id Course is required",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const chapter = await Section.find({ course: idCourse }).populate([
        {
          path: "lessions",
          select: "name mota teacher users ralseHand plusMark",
          populate: [
            {
              path: "teacher",
              select: "fullName",
            },
            {
              path: "users",
              select: "avatar email fullName address phone online",
            },
            {
              path: "ralseHand",
              select: "time user",
              populate: {
                path: "user",
                select: "avatar email fullName address phone online",
              },
            },
            {
              path: "plusMark",
              select: "time user",
              populate: {
                path: "user",
                select: "avatar email fullName address phone online",
              },
            },
          ],
        },
      ]);
      res
        .json({
          chapters: chapter,
          status: 200,
        })
        .status(httpStatus.OK)
        .end();
    } catch (error) {
      next(error);
    }
  };
  static getChapter = async (
    req: Request<IUpdate, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req?.params;
      const chapter = await Section.findById(id);
      if (!chapter) {
        throw new APIError({
          message: "NOT FOUND !",
          status: httpStatus.NOT_FOUND,
        });
      }
      const chapterRes = await chapter.populate([
        {
          path: "lessions",
          select: "name mota teacher users ralseHand plusMark",
          populate: [
            {
              path: "teacher",
              select: "fullName",
            },
            {
              path: "users",
              select: "avatar email fullName address phone online",
            },
            {
              path: "ralseHand",
              select: "time user",
              populate: {
                path: "user",
                select: "avatar email fullName address phone online",
              },
            },
            {
              path: "plusMark",
              select: "time user",
              populate: {
                path: "user",
                select: "avatar email fullName address phone online",
              },
            },
          ],
        },
      ]);
      res
        .json({
          data: chapterRes,
          status: 200,
        })
        .status(httpStatus.OK)
        .end();
    } catch (error) {
      next(error);
    }
  };
}
