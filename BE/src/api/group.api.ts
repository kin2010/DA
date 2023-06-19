import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Course, Group, Lecture, Section, User } from "../models";
import APIError from "../utils/APIError";
import { MeetingChatType } from "./meeting.api";

export type IGroup = {
  id: string;
  course: string;
  name: string;
  description: string;
};
export type Tget = {
  id: string;
};

export type IUpdateChapter = { body: IGroup; id: string };
export default class GroupApi {
  static add = async (
    req: Request<IGroup, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { course } = req?.body;
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
      const group = await await Group.create({ ...data });
      await cc.update({
        groups: [...cc.groups, group?._id],
      });
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
    req: Request<IGroup, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id, ...other } = req.body;
      const out = await Group.findById(id);
      if (!out) {
        throw new APIError({
          message: "Not found",
          status: httpStatus.NOT_FOUND,
        });
      }
      const chapter = await await Group.findByIdAndUpdate(
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
      const group = await Group.findById(id);
      if (!group) {
        throw new APIError({
          message: "NOT FOUND !",
          status: httpStatus.NOT_FOUND,
        });
      }
      const groupRes = await group.populate([
        {
          path: "course",
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
          path: "chats",
          select: "",
          populate: [
            {
              path: "user",
              select: "",
            },
          ],
        },
        {
          path: "meetings",
          select: "",
          populate: [
            {
              path: "users",
              select: "",
            },
            {
              path: "attendance",
              select: "",
            },
            {
              path: "createdby",
              select: "",
            },
          ],
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
  static chat = async (
    req: Request<
      {
        group: string;
        msg: string;
        userId: string;
        time: string;
      },
      Query,
      Params
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { group, userId, msg, time } = req.body;
      const r = await Group.findById(group);
      console.log(999, req.body);
      if (!r) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "Group is not exist!",
        });
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "User not found",
        });
      }
      const messages = r.chats || [];
      const newChats = [
        ...messages,
        {
          user: userId,
          time: time || new Date(),
          msg: msg,
        },
      ];
      const rs = await (
        await Group.findByIdAndUpdate(group, { chats: newChats }, { new: true })
      )?.populate([
        {
          path: "course",
          select: "",
        },
        {
          path: "chats",
          select: "",
          populate: {
            path: "user",
            select: "",
          },
        },
      ]);
      res
        .json({
          data: rs,
          status: 200,
        })
        .status(200)
        .end();
    } catch (error) {
      next(error);
    }
  };
}
