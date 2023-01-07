import { validationResult } from "express-validator";
import { DiaryGetRequestDto } from "./../interfaces/diary/DiaryRequestDto";
import { UserRequestDto } from "./../interfaces/user/UserRequestDto";
import { Request, Response } from "express";
import { message, status } from "../constants";
import { UserService } from "../services";
import { fail, success } from "../utils/response";
import { slack, slackMessage } from "../config/slackConfig";

const updateUserInfo = async (req: Request, res: Response) => {
  const { userId, username, bio } = req.body;

  try {
    const userRequestDto: UserRequestDto = {
      userId: userId,
      username: username,
      bio: bio,
    };

    const data = await UserService.updateUserInfo(userRequestDto);

    if (!data) {
      return res
        .status(status.BAD_REQUEST)
        .send(fail(status.BAD_REQUEST, message.OUT_OF_VALUE));
    }
    return res
      .status(status.OK)
      .send(success(status.OK, message.SIGNUP_SUCCESS));
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error, userId);
    slack(log);
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const getUserDiaryDetail = async (req: Request, res: Response) => {
  const { diaryId } = req.params;
  const { userId } = req.body;

  const diaryGetRequestDto: DiaryGetRequestDto = {
    userId,
    diaryId,
  };

  try {
    const data = await UserService.getDiaryByUserId(diaryGetRequestDto);

    if (!data) {
      res
        .status(status.BAD_REQUEST)
        .send(fail(status.BAD_REQUEST, message.BAD_DIARY_ID));
    }

    return res
      .status(status.OK)
      .send(success(status.OK, message.GET_DIARY_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error, userId);
    slack(log);

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const getUserInfo = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(status.BAD_REQUEST)
      .send(fail(status.BAD_REQUEST, message.NULL_VALUE));
  }
  const userId = req.body.userId as string;

  try {
    const data = await UserService.getUserInfo(+userId);

    if (!data) {
      res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }
    return res
      .status(status.OK)
      .send(success(status.OK, message.MY_PAGE_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error, +userId);
    slack(log);
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const getUserDiaryList = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const data = await UserService.getUserDiaryList(+userId);

    if (!data) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    return res
      .status(status.OK)
      .send(success(status.OK, message.GET_DIARY_LIST_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error, userId);
    slack(log);

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const userController = {
  updateUserInfo,
  getUserDiaryDetail,
  getUserInfo,
  getUserDiaryList,
};
export default userController;
