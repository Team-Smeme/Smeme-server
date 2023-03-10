import {
  DiaryDeleteRequestDto,
  DiaryUpdateRequestDto,
} from "./../interfaces/diary/DiaryRequestDto";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { slack, slackMessage } from "../config/slackConfig";
import { message, status } from "../constants";
import { DiaryRequestDto } from "../interfaces/diary/DiaryRequestDto";
import { DiaryService } from "../services";
import { fail, success } from "../utils/response";
import statusCode from "../constants/statusCode";
import { DiaryLikeDto } from "../interfaces/diary/DiaryLikeDto";

const createDiary = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(status.BAD_REQUEST)
      .send(fail(status.BAD_REQUEST, message.NULL_VALUE));
  }

  const diaryRequestDto: DiaryRequestDto = req.body;

  try {
    const data = await DiaryService.createDiary(diaryRequestDto);

    if (data === status.UNAUTHORIZED) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    if (!data) {
      return res
        .status(status.BAD_REQUEST)
        .send(fail(status.BAD_REQUEST, message.BAD_REQUEST));
    }

    return res
      .status(status.CREATED)
      .send(success(status.CREATED, message.CREATE_DIARY_SUCCESS, data));
  } catch (error) {
    console.log("Cannot create diary", error);
    const log = slackMessage(
      req.method,
      req.originalUrl,
      error,
      Number(diaryRequestDto.userId),
    );
    slack(log);
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const getDiaryById = async (req: Request, res: Response) => {
  const { diaryId } = req.params;
  const { userId } = req.body;

  try {
    const data = await DiaryService.getDiaryById(+diaryId, +userId);

    if (data === statusCode.UNAUTHORIZED) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    if (data === statusCode.INTERNAL_SERVER_ERROR) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .send(
          fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
        );
    }

    return res
      .status(status.OK)
      .send(success(status.OK, message.GET_DIARY_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      userId,
    );
    slack(log);
  }
};

const getOpenDiaries = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { category } = req.query;

  let categoryId = undefined;

  if (category) {
    categoryId = +category;
  }

  try {
    const data = await DiaryService.getOpenDiaries(+userId, categoryId);

    if (data === statusCode.UNAUTHORIZED) {
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    if (data === statusCode.INTERNAL_SERVER_ERROR) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .send(
          fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
        );
    }

    return res
      .status(status.OK)
      .send(success(status.OK, message.GET_DIARY_LIST_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      userId,
    );
    slack(log);
  }
};

const deleteDiary = async (req: Request, res: Response) => {
  const { diaryId } = req.params;
  const { userId } = req.body;

  const diaryDeleteRequestDto: DiaryDeleteRequestDto = {
    userId: userId,
    diaryId: diaryId,
  };

  try {
    const data = await DiaryService.deleteDiary(diaryDeleteRequestDto);

    if (!data) {
      return res
        .status(status.BAD_REQUEST)
        .send(fail(status.BAD_REQUEST, message.BAD_DIARY_ID));
    }

    return res
      .status(status.OK)
      .send(success(status.OK, message.DELETE_DIARY_SUCCESS));
  } catch (error) {
    const log = slackMessage(
      req.method.toUpperCase(),
      req.originalUrl,
      error,
      userId,
    );
    slack(log);
  }
  return res
    .status(status.INTERNAL_SERVER_ERROR)
    .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
};

const updateDiary = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(status.BAD_REQUEST)
      .send(fail(status.BAD_REQUEST, message.NULL_VALUE));
  }

  const { diaryId } = req.params;
  const { userId, content, isPublic, topicId, targetLang } = req.body;

  const diaryUpdateRequestDto: DiaryUpdateRequestDto = {
    userId: userId,
    diaryId: diaryId,
    content: content,
    isPublic: isPublic,
    topicId: topicId,
    targetLang: targetLang,
  };

  try {
    const data = await DiaryService.updateDiary(diaryUpdateRequestDto);

    if (!data) {
      return res
        .status(status.BAD_REQUEST)
        .send(fail(status.BAD_REQUEST, message.OUT_OF_VALUE));
    }

    return res
      .status(status.OK)
      .send(success(status.OK, message.UPDATE_DIARY_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error, userId);
    slack(log);

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const getLikeDiary = async (req: Request, res: Response) => {
  const { userId, diaryId } = req.body;

  try {
    const data = await DiaryService.getLikeDiary(+userId, +diaryId);

    if (data === statusCode.UNAUTHORIZED) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    if (data === statusCode.BAD_REQUEST) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    if ((data as DiaryLikeDto).hasLike) {
      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, message.LIKE_SUCCESS, data));
    } else {
      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, message.UNLIKE_SUCCESS, data));
    }
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error, userId);
    slack(log);

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const diaryController = {
  createDiary,
  getDiaryById,
  getOpenDiaries,
  deleteDiary,
  updateDiary,
  getLikeDiary,
};

export default diaryController;
