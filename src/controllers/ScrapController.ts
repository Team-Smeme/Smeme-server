import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { message } from "../constants";
import statusCode from "../constants/statusCode";
import { fail, success } from "../utils/response";
import { slack, slackMessage } from "../config/slackConfig";
import { ScrapService } from "../services";
import { ScrapRequestDto } from "../interfaces/scrap/ScrapRequestDto";

const createScrap = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
  }

  const scrapRequestDto: ScrapRequestDto = req.body;

  try {
    const scrapId = await ScrapService.createScrap(scrapRequestDto);

    if (scrapId === statusCode.UNAUTHORIZED) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    if (scrapId === statusCode.BAD_REQUEST) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const data = {
      scrapId: scrapId,
    };

    return res
      .status(statusCode.CREATED)
      .send(success(statusCode.CREATED, message.SCRAP_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(
      req.method,
      req.originalUrl,
      error,
      Number(scrapRequestDto.diaryId),
    );
    slack(log);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
      );
  }
};

const scrapController = {
  createScrap,
};

export default scrapController;
