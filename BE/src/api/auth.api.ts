import { NextFunction, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { Query, Params, Request } from "../configs/types";
import { Role, User } from "../models";
import APIError from "../utils/APIError";
import JWT from "../utils/jwt";

export type IRequestBodyLogin = {
  email: string;
  password: string;
};

export type IRequestBodyRegister = {
  email: string;
  password: string;
  fullName: string;
  role?: string;
};
export type IRequestGetUser = {
  token: string;
};

export default class AuthService {
  static login = async (
    req: Request<IRequestBodyLogin, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        throw new APIError({
          message: "User not found",
          status: httpStatus.NOT_FOUND,
        });
      }

      const isMatchPassword = password === user?.password;
      if (!isMatchPassword) {
        throw new APIError({
          message: "Invalid Password",
          status: httpStatus.BAD_REQUEST,
        });
      }
      const token = JWT.sign({ _id: user._id as unknown as string });
      res
        .json({
          status: 200,
          message: "Login successfully",
          user: user,
          token: token,
        })
        .status(httpStatus.CREATED)
        .end();
    } catch (error) {
      next(error);
    }
  };

  static register = async (
    req: Request<IRequestBodyRegister, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, role, fullName } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        throw new APIError({
          message: "Email already exists",
          status: httpStatus.BAD_REQUEST,
        });
      }
      const r = await Role.findOne({ _id: role });
      if (!r) {
        throw new APIError({
          message: "Internal server error",
          status: httpStatus.INTERNAL_SERVER_ERROR,
        });
      }
      const newUser = {
        email,
        password: password,
        fullName,
        role: r._id,
      };
      const res1 = await User.create(newUser);
      res.json(res1).status(httpStatus.CREATED).end();
    } catch (error) {
      next(error);
    }
  };

  static getUser = async (
    req: Request<IRequestGetUser, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.body;

      if (!token) {
        throw new APIError({
          status: httpStatus.UNAUTHORIZED,
          message: "Unauthorizedccc",
        });
      }

      const tokenPayload = JWT.verify(token);
      if (!tokenPayload) {
        throw new APIError({
          status: httpStatus.UNAUTHORIZED,
          message: "Unauthorized",
        });
      }
      const user = await User.findOne({
        _id: tokenPayload._id,
      }).populate([{ path: "role", select: "roleName" }]);

      if (!user) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: "User not found",
        });
      }

      res.json({ user: user.show() }).status(httpStatus.OK).end();
    } catch (error) {
      next(error);
    }
  };
}
