import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Course, Lecture, Section } from "../models";
import Chapter from "../models/chapter";
import APIError from "../utils/APIError";
export type IRequestLecture = {
  id: string;
  name: string;
  description: string;
  section: string;
  teacher: string[];
  users: string[];
  start: Date;
  end: Date;
  video: string[];
  attachments: string[];
  youtube_url: string;
  ralseHand: [
    {
      time: Date;
      user: string;
    }
  ];
  plusMark: [
    {
      user: string;
      mark: number;
    }
  ];
  baitap: string[];
  view: number;
  time: number;
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
export type IUpdateChapter = { body: Ichapter; id: string };
export default class LectureApi {
  static create = async (
    req: Request<IRequestLecture, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { section } = req.body;
      console.log(section, 3);
      const ch = await Section.findById(section);
      if (!ch) {
        throw new APIError({
          message: "Section Id is required",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const lecture = await (
        await Lecture.create({ ...req.body })
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
      ]);
      await ch.updateOne({
        $set: { lectures: [...ch.lectures, lecture?._id] },
      });
      res
        .json({
          lession: lecture,
          message: "Create successfully ",
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static getById = async (
    req: Request<Tget, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const coures = await (
        await Lecture.findById(req.params.id)
      )?.populate([
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
      ]);
      res
        .json({
          lession: coures,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next();
    }
  };
  static update = async (
    req: Request<IRequestLecture, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, ...other } = req.body;
      const out = await Lecture.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }

      const coures = await (
        await Lecture.findByIdAndUpdate(
          id,
          { ...other },
          {
            new: true,
          }
        )
      )?.populate([
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
      ]);
      res
        .json({
          lession: coures,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static updateChapter = async (
    req: Request<Ichapter, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { idChapter, ...other } = req.body;
      const out = await Section.findById(idChapter);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }
      const chapter = await (
        await Section.findByIdAndUpdate(
          idChapter,
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
          chapter: chapter,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next();
    }
  };
  static addChapter = async (
    req: Request<Ichapter, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { course } = req?.params;
      console.log(course, "idcour");
      const cc = await Course.findById(course);
      if (!cc) {
        throw new APIError({
          message: "Course id is required",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const data = {
        ...req.body,
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
