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

const userController = {
  updateUserInfo,
};
export default userController;
