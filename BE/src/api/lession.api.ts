import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Assignment, Course, Lecture, Section } from "../models";
import Chapter from "../models/chapter";
import APIError from "../utils/APIError";
import { request } from "http";
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
  id: string;
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
          select: "",
        },
        {
          path: "users",
          select: "",
        },
        {
          path: "ralseHand",
          select: "time user",
          populate: {
            path: "user",
            select: "",
          },
        },
      ]);
      await ch.updateOne({
        $set: { lectures: [...ch.lectures, lecture?._id] },
      });
      res
        .json({
          data: lecture,
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
      const lecture = await (
        await Lecture.findById(req.params.id)
      )?.populate([
        {
          path: "teacher",
          select: "",
        },
        {
          path: "users",
          select: "",
        },
        {
          path: "ralseHand",
          select: "time user",
          populate: {
            path: "user",
            select: "",
          },
        },
        {
          path: "comments",
          select: "",
          populate: {
            path: "user",
            select: "",
          },
        },
      ]);
      if (!lecture) {
        throw new APIError({
          message: "NOT FOUND",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const sectionId = lecture?.section;
      const section = await Section.findById(sectionId);
      let courseData: any;
      if (section?.course) {
        courseData = await Course.findById(section.course);
      }
      if (lecture) {
        lecture.course = courseData;
      }
      res
        .json({
          data: lecture,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
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
          select: "",
        },
        {
          path: "ralseHand",
          select: "time user",
          populate: {
            path: "user",
            select: "",
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
      const { id } = req.params;
      console.log(id);
      const out = await Section.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }
      const chapter = await Section.findByIdAndUpdate(
        id,
        { ...req.body },
        {
          new: true,
        }
      );
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
              select: "",
            },
            {
              path: "ralseHand",
              select: "time user",
              populate: {
                path: "user",
                select: "",
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
              select: "",
            },
            {
              path: "ralseHand",
              select: "time user",
              populate: {
                path: "user",
                select: "",
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
  static addComment = async (
    req: Request<Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, type } = req.body;
      console.log(req.body, 3);
      let re: any = "";
      if (type === "lecture") {
        re = await Lecture.findByIdAndUpdate(
          id,
          {
            $push: {
              comments: {
                time: new Date(),
                ...req.body,
              },
            },
          },
          { new: true }
        );
        console.log(re, 21421);
      } else {
        re = await Assignment.findByIdAndUpdate(
          id,
          {
            $push: {
              comments: {
                time: new Date(),
                ...req.body,
              },
            },
          },
          { new: true }
        );
      }

      res
        .json({
          data: re,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
}
