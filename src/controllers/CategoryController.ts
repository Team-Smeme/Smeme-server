import { Request, Response } from "express";
import { slack, slackMessage } from "../config/slackConfig";
import { message, status } from "../constants";
import { CategoryService } from "../services";
import { fail, success } from "../utils/response";

const getTopics = async (req: Request, res: Response) => {
  try {
    const data = await CategoryService.getTopics();

    return res
      .status(status.OK)
      .send(success(status.OK, message.GET_TOPIC_SUCCESS, data));
  } catch (error) {
    const log = slackMessage(req.method, req.originalUrl, error);
    slack(log);

    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

const categoryController = {
  getTopics,
};

export default categoryController;
