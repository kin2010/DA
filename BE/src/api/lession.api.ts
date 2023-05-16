import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Course, Lession } from "../models";
import Chapter from "../models/chapter";
import APIError from "../utils/APIError";
export type IRequestLession = {
  id: string;
  chapter: string;
  teacher: string[];
  users: string[];
  start: Date;
  end: Date;
  video: string;
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
  idCourse: string;
  name: string;
  lessions: string[];
  baitaps: string[];
  mota: string;
};
export type Tget = {
  id: string;
};
export type IUpdate = {
  body: IRequestLession;
  id: string;
};
export type IUpdateChapter = { body: Ichapter; id: string };
export default class LessionApi {
  static create = async (
    req: Request<IRequestLession, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { chapter } = req.body;
      const ch = await Chapter.findById(chapter);
      if (!ch) {
        throw new APIError({
          message: "Id Chapter is required",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const coures = await (
        await Lession.create({ ...req.body })
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
      await ch.updateOne({ $set: { lessions: [...ch.lessions, coures?._id] } });

      res
        .json({
          lession: coures,
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
        await Lession.findById(req.params.id)
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
    req: Request<IRequestLession, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, ...other } = req.body;
      const out = await Lession.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }

      const coures = await (
        await Lession.findByIdAndUpdate(
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
      const out = await Chapter.findById(idChapter);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }
      const chapter = await (
        await Chapter.findByIdAndUpdate(
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
      const { idCourse } = req?.body;
      const cc = await Course.findById(idCourse);
      if (!cc) {
        throw new APIError({
          message: "Id Course is required",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const data = {
        ...req.body,
        course: idCourse,
      };
      const chapter = await (
        await Chapter.create({ ...data })
      )?.populate([
        {
          path: "lessions",
          select: "teacher mota",
        },
      ]);
      await cc.update({
        chapter: [...cc.chapter, chapter?._id],
      });
      res
        .json({
          chapter: chapter,
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
      const { idCourse } = req?.body;
      console.log(2, idCourse);
      const cc = await Course.findById(idCourse);
      if (!cc) {
        throw new APIError({
          message: "Id Course is required",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const chapter = await Chapter.find({ course: idCourse }).populate([
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
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static getCha = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req?.body;
      const chapter = await Chapter.findById(id);
      if (!chapter) {
        throw new APIError({
          message: "NOT FOUND !",
          status: httpStatus.NOT_FOUND,
        });
      }
      return chapter.populate([
        {
          path: "lessions",
          select: "teacher mota",
        },
      ]);
    } catch (error) {
      next(error);
    }
  };
}
