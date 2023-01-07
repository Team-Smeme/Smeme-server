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
  const { diaryId } = req.params;
  const { userId, content, isPublic, category, targetLang } = req.body;

  const diaryUpdateRequestDto: DiaryUpdateRequestDto = {
    userId: userId,
    diaryId: diaryId,
    content: content,
    isPublic: isPublic,
    category: category,
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

const diaryController = {
  createDiary,
  deleteDiary,
  updateDiary,
};

export default diaryController;
