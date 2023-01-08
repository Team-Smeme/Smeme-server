import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { message } from "../constants";
import statusCode from "../constants/statusCode";
import { fail, success } from "../utils/response";
import { slack, slackMessage } from "../config/slackConfig";
import { ScrapService } from "../services";
import { ScrapRequestDto } from "../interfaces/scrap/ScrapRequestDto";
import scrapService from "../services/ScrapService";

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

const getScrapsByUser = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const scraps = await scrapService.getScrapsByUser(+userId);

    if (scraps === statusCode.UNAUTHORIZED) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
    }

    const data = {
      scrap: scraps,
    };

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.GET_SCRAP_LIST_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(
      req.method,
      req.originalUrl,
      error,
      Number(userId),
    );
    slack(log);
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR),
      );
  }
};

const deleteScrapById = async (req: Request, res: Response) => {
  const { scrapId } = req.params;
  const { userId } = req.body;

  try {
    const data = await ScrapService.deleteScrapById(+userId, +scrapId);

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

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.DELETE_SCRAP_SUCCESS));
  } catch (error) {
    const log = slackMessage(
      req.method,
      req.originalUrl,
      error,
      Number(scrapId),
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
  getScrapsByUser,
  deleteScrapById,
};

export default scrapController;
