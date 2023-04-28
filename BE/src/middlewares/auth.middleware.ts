import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import { IUser, User } from '../models';
import JWT from '../utils/jwt';
import APIError from '../utils/APIError';
import { Params, Query, Request } from '../configs/types';

class AuthMiddleware {
  static requireAuth: RequestHandler = async (req: any, res, next) => {
    try {
      const token = JWT.get(req);

      if (!token) {
        throw new APIError({
          status: httpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }

      const tokenPayload = JWT.verify(token);
      const user = await User.findOne({
        _id: tokenPayload._id,
        isVerify: true,
      });

      if (!user) {
        throw new APIError({
          status: httpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  };
}

export default AuthMiddleware;
