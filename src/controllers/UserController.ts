import { UserRequestDto } from "./../interfaces/user/UserRequestDto";
import { Request, Response } from "express";
import { message, status } from "../constants";
import { UserService } from "../services";
import { fail, success } from "../utils/response";

const updateUserInfo = async (req: Request, res: Response) => {
  const { userId, username, bio } = req.body;

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
  return res.status(status.OK).send(success(status.OK, message.SIGNUP_SUCCESS));
};

const userController = {
  updateUserInfo,
};
export default userController;
