import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import APIError from "../utils/APIError";
import { Query, Params, Request } from "../configs/types";
import { Assignment, Course, IAssignment, Section } from "../models";
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
export default class AssignmentService {
  static create = async (
    req: Request<IAssignment, Query, Params>,
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
      const assignment = await Assignment.create({ ...req.body });
      //   .populate([
      //     {
      //       path: "teacher",
      //       select: "fullName",
      //     },
      //     {
      //       path: "users",
      //       select: "avatar email fullName address phone online",
      //     },
      //     {
      //       path: "ralseHand",
      //       select: "time user",
      //       populate: {
      //         path: "user",
      //         select: "avatar email fullName address phone online",
      //       },
      //     },
      //     {
      //       path: "plusMark",
      //       select: "time user",
      //       populate: {
      //         path: "user",
      //         select: "avatar email fullName address phone online",
      //       },
      //     },
      //   ]);
      await ch.updateOne({
        $set: { assignments: [...ch.assignments, assignment?._id] },
      });
      res
        .json({
          data: assignment,
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
      const assignment = await Assignment.findById(req.params.id)?.populate([
        {
          path: "comments",
          select: "",
          populate: [{ path: "user", select: "" }],
        },
      ]);
      const sectionId = assignment?.section;
      const section = await Section.findById(sectionId);
      let courseData: any;
      if (section?.course) {
        courseData = await Course.findById(section.course);
      }
      if (assignment) {
        assignment.course = courseData;
      }
      res
        .json({
          data: assignment,
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static update = async (
    req: Request<IAssignment, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, ...other } = req.body;
      console.log(req.body, 141414);
      const out = await Assignment.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }

      const coures = await Assignment.findByIdAndUpdate(
        id,
        { ...other },
        {
          new: true,
        }
      );
      //   ?.populate([
      //     {
      //       path: "teacher",
      //       select: "fullName",
      //     },
      //     {
      //       path: "users",
      //       select: "avatar email fullName address phone online",
      //     },
      //     {
      //       path: "ralseHand",
      //       select: "time user",
      //       populate: {
      //         path: "user",
      //         select: "avatar email fullName address phone online",
      //       },
      //     },
      //     {
      //       path: "plusMark",
      //       select: "time user",
      //       populate: {
      //         path: "user",
      //         select: "avatar email fullName address phone online",
      //       },
      //     },
      //   ]);
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
}
