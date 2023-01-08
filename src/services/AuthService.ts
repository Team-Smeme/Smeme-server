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

  const userExist = await prisma.users.findFirst({
    where: {
      social_id: socialId,
    },
  });

  if (!userExist) {
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
        id: userId,
      },
    });

    const accessToken = jwtHandler.sign(userId);
    const isRegistered = false;

    return {
      accessToken,
      refreshToken,
      isRegistered,
    };
  }

  if (!userExist.refresh_token || !userExist.username) {
    const isRegistered = false;

    if (!userExist.refresh_token) {
      const refreshToken = jwtHandler.signRefreshToken();
      const accessToken = jwtHandler.sign(Number(userExist.id));

      return {
        refreshToken,
        accessToken,
        isRegistered,
      };
    }

    const refreshToken = userExist.refresh_token;
    const accessToken = jwtHandler.sign(Number(userExist.id));

    return {
      refreshToken,
      accessToken,
      isRegistered,
    };
  }

  const isRegistered = true;
  const refreshToken = userExist.refresh_token;
  const accessToken = jwtHandler.sign(Number(userExist.id));

  return {
    refreshToken,
    accessToken,
    isRegistered,
  };
};

const AuthService = {
  signIn,
};

export default AuthService;
