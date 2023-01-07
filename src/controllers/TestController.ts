import { Request, Response } from "express";
import statusCode from "../constants/statusCode";
import { success } from "../utils/response";

const getTest = async (req: Request, res: Response) => {
  return res
    .status(statusCode.OK)
    .send(success(statusCode.OK, "서버 통신 성공"));
};

const testController = {
  getTest,
};

export default testController;
