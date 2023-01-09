import { AuthRequestDto } from "../interfaces/auth/AuthRequestDto";
import { Request, Response } from "express";
import { message, status, tokenType } from "../constants";
import { AuthService, UserService } from "../services";
import jwtHandler from "../utils/jwtHandler";
import { fail, success } from "../utils/response";
import { slack, slackMessage } from "../config/slackConfig";
import { validationResult } from "express-validator";

const signIn = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(status.UNAUTHORIZED)
      .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
  }
  const socialToken = req.headers.authorization
    ?.split(" ")
    .reverse()[0] as string;

  const { social } = req.body;

  try {
    const authRequestDto: AuthRequestDto = {
      socialToken: socialToken,
      social: social,
    };

    const data = await AuthService.signIn(authRequestDto);

    return res
      .status(status.OK)
      .send(success(status.OK, message.SIGNIN_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error);
    slack(log);
    if (error == status.UNAUTHORIZED) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const getToken = async (req: Request, res: Response) => {
  const accessToken = req.headers.accesstoken;
  const refreshToken = req.headers.refreshtoken;

  if (!accessToken || !refreshToken) {
    return res
      .status(status.BAD_REQUEST)
      .send(fail(status.BAD_REQUEST, message.EMPTY_TOKEN));
  }

  try {
    const decodedToken = jwtHandler.verify(accessToken as string);

    if (decodedToken == tokenType.TOKEN_INVALID) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    const decodedRefreshToken = jwtHandler.verify(refreshToken as string);

    if (decodedRefreshToken === tokenType.TOKEN_INVALID) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    if (decodedRefreshToken === tokenType.TOKEN_EXPIRED) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.EXPIRED_ALL_TOKEN));
    }

    const user = await UserService.findUserByRefreshToken(
      refreshToken as string,
    );
    if (!user) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }
    const userId = user.id;

    const data = {
      accessToken: jwtHandler.sign(userId),
      refreshToken: refreshToken,
    };

    return res
      .status(status.OK)
      .send(success(status.OK, message.CREATE_TOKEN_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error);
    slack(log);
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const authController = {
  signIn,
  getToken,
};

export default authController;
