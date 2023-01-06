import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { message, status } from "../constants";
import { DiaryRequestDto } from "../interfaces/diary/DiaryRequestDto";
import diaryService from "../services/DiaryService";
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
    const data = await diaryService.createDiary(diaryRequestDto);

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
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const diaryController = {
  createDiary,
};

export default diaryController;
