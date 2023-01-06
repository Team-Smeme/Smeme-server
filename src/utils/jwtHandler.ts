// src/modules/jwtHandler.ts
import jwt from "jsonwebtoken";
import { tokenType } from "../constants";
import config from "../config";

// access token 생성 code
const sign = (userId: number) => {
  const payload = {
    userId,
  };

  const accessToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "2h",
  });
  return accessToken;
};

// refresh token 생성 코드
const signRefreshToken = () => {
  const payload = {};

  const refreshToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "14d",
  });

  return refreshToken;
};

// token 검사 code
const verify = (token: string) => {
  let decoded: string | jwt.JwtPayload;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error: any) {
    if (error.message === "jwt expired") {
      return tokenType.TOKEN_EXPIRED;
    } else if (error.message === "invalid token") {
      return tokenType.TOKEN_INVALID;
    } else {
      return tokenType.TOKEN_INVALID;
    }
  }

  return decoded;
};

export default {
  sign,
  signRefreshToken,
  verify,
};
