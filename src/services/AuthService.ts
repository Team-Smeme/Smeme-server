import jwtHandler from "../utils/jwtHandler";
import social from "../utils/social";
import { PrismaClient } from "@prisma/client";
import { AuthRequestDto } from "../interfaces/auth/AuthRequestDto";

const prisma = new PrismaClient();

const signIn = async (authRequestDto: AuthRequestDto) => {
  const socialToken = authRequestDto.socialToken;

  const userInfo = await social.signKakaoUser(socialToken);

  if (!userInfo) {
    return null;
  }

  const socialId = String(userInfo.id);

  const user = await prisma.users.create({
    data: {
      social: authRequestDto.social,
      social_id: socialId,
      target_lang: "en",
    },
  });

  if (!user) {
    return null;
  }
  const userId = Number(user.id);

  const refreshToken = jwtHandler.signRefreshToken();

  await prisma.users.update({
    data: {
      refresh_token: refreshToken,
    },
    where: {
      id: user.id,
    },
  });

  const accessToken = jwtHandler.sign(userId);

  const result = {
    accessToken,
    refreshToken,
  };

  return result;
};

const AuthService = {
  signIn,
};

export default AuthService;
