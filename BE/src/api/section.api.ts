import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import APIError from "../utils/APIError";
import { Query, Params, Request } from "../configs/types";
import { Section } from "../models";

export type ISection = {
  name: string;
};

export default class SectionService {
  static add = async (
    req: Request<ISection, Query, Params>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //   const r = await Section.findOne({ name: req.body.name });
      //   if (!!r) {
      //     throw new APIError({
      //       message: "Section is adready exist",
      //       status: httpStatus.BAD_REQUEST,
      //     });
      //   }
      const section = await Section.create({
        name: req.body.name,
      });
      res.json({ data: section, status: 200 }).end();
    } catch (error) {
      next(error);
    }
  };
}
