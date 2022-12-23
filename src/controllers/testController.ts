import { Request, Response } from "express";
// import { userService } from "../service";

/** example */

const getUserById = async (req: Request, res: Response) => {
  // const { userId } = req.params;

  // const data = await userService.getUserById(+userId);

  // if (!data) {
  //   return res.status(404).json({ status: 404, message: "NOT_FOUND" });
  // }
  // return res.status(200).json({ status: 200, message: "유저 조회 성공", data });
};

//* 유저 정보 생성


//* 유저 정보 전체 조회


//* 유저 정보 업데이트


//* 유저 정보 삭제


const testController = {
  getUserById,
};

export default testController;