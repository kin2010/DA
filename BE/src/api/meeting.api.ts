import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { IMeeting, Meeting, User } from "../models";
import APIError from "../utils/APIError";

type GetRoomRequestType = {
  url?: string;
  _id?: string;
};

type MeetingUpdateType = {
  _id: string;
  data: IMeeting;
};

type MeetingOnlineType = {
  userId: string;
  room: string;
  type?: string;
};

export type MeetingChatType = {
  room: string;
  userId: string;
  message: string;
  time?: Date;
};

export default class MeetingApi {
  static create = async (
    req: Request<IMeeting, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const mtg = await (
        await Meeting.create({ ...req.body })
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
        {
          path: "chat",
          select: "user time msg",
          populate: {
            path: "user",
            select: "avatar email fullName address phone online",
          },
        },
      ]);

      res
        .json({
          meeting: mtg,
          message: "Create successfully ",
          status: 200,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  };
  static getRoom = async (
    req: Request<GetRoomRequestType, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { url } = req.body;
      if (!url) {
        throw new APIError({
          message: "Room not found",
          status: 404,
        });
      }
      const mtg = await Meeting.findOne({ url: url });
      if (!mtg) {
        throw new APIError({
          message: "Room not found",
          status: 404,
        });
      }
      res
        .json({
          meeting: mtg,
          status: 200,
        })
        .status(200)
        .end();
    } catch (error) {
      next(error);
    }
  };
  static update = async (
    req: Request<MeetingUpdateType, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { _id, data } = req.body;
      if (!_id) {
        throw new APIError({
          message: "Room not found",
          status: 404,
        });
      }
      const mtg = await (
        await Meeting.findOneAndUpdate({ _id: _id }, { ...data }, { new: true })
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
        {
          path: "chat",
          select: "user time msg",
          populate: {
            path: "user",
            select: "avatar email fullName address phone online",
          },
        },
      ]);
      if (!mtg) {
        throw new APIError({
          message: "Room not found",
          status: 404,
        });
      }
      res
        .json({
          meeting: mtg,
          status: 200,
        })
        .status(200)
        .end();
    } catch (error) {
      next(error);
    }
  };
  //
  static online = async (
    req: Request<MeetingOnlineType, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId, room, type } = req.body;
      const roomExist = await Meeting.findOne({
        url: room,
      });
      let rs: any;
      if (!roomExist) {
        rs = await (
          await Meeting.create({
            user: [userId],
          })
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
          {
            path: "chat",
            select: "user time msg",
            populate: {
              path: "user",
              select: "avatar email fullName address phone online",
            },
          },
        ]);
      } else {
        const r = await Meeting.findOne({ url: room });
        const users = r?.users?.map((vl) => vl?.valueOf());
        const set = new Set(users);
        if (type === "delete") {
          console.log(22, users);
          set.delete(userId);
        } else {
          set.add(userId);
        }
        console.log("after", set);
        rs = await (
          await Meeting.findOneAndUpdate(
            {
              url: room,
            },
            {
              users: Array.from(set),
            },
            { new: true }
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
          {
            path: "chat",
            select: "user time msg",
            populate: {
              path: "user",
              select: "avatar email fullName address phone online",
            },
          },
        ]);
      }
      res
        .json({
          meeting: rs,
          status: 200,
        })
        .status(200)
        .end();
    } catch (error) {
      next(error);
    }
  };

  static chat = async (
    req: Request<MeetingChatType, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { room, userId, message, time } = req.body;
      const r = await Meeting.findOne({ url: room });
      if (!r) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "Room is not exist!",
        });
      }
      const user = await User.findById(userId);
      if (!user) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "User not found",
        });
      }
      const messages = r.chat;
      console.log(22, messages);
      const newChats = [
        ...messages,
        {
          user: userId,
          time: time || new Date(),
          msg: message,
        },
      ];
      const rs = await (
        await Meeting.findOneAndUpdate(
          { url: room },
          { chat: newChats },
          { new: true }
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
        {
          path: "chat",
          select: "user time msg",
          populate: {
            path: "user",
            select: "avatar email fullName address phone online",
          },
        },
      ]);
      res
        .json({
          msg: rs,
          status: 200,
        })
        .status(200)
        .end();
    } catch (error) {
      next(error);
    }
  };
}
