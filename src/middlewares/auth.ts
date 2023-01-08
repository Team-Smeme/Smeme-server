import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { message, status } from "../constants";
import { fail } from "../utils/response";
import tokenType from "../constants/tokenType";
import jwtHandler from "../utils/jwtHandler";

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ").reverse()[0]; // Bearer ~~ 에서 토큰만 파싱
  if (!token)
    return res
      .status(status.UNAUTHORIZED)
      .send(fail(status.UNAUTHORIZED, message.EMPTY_TOKEN));

  try {
    const decoded = jwtHandler.verify(token); // jwtHandler에서 만들어둔 verify로 토큰 검사

    // 토큰 에러 분기 처리
    if (decoded === tokenType.TOKEN_EXPIRED)
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.EXPIRED_TOKEN));
    if (decoded === tokenType.TOKEN_INVALID)
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));

    // decode한 후 담겨있는 userId를 꺼내옴
    const userId: number = (decoded as JwtPayload).userId;
    if (!userId)
      return res
        .status(status.UNAUTHORIZED)
        .send(fail(status.UNAUTHORIZED, message.INVALID_TOKEN));

    // 얻어낸 userId 를 Request Body 내 userId 필드에 담고, 다음 미들웨어로 넘김( next() )
    req.body.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .send(fail(status.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};