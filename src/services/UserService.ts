import { PrismaClient } from "@prisma/client";
import { UserRequestDto } from "../interfaces/user/UserRequestDto";
const prisma = new PrismaClient();

// user 정보 기입
const updateUserInfo = async (userRequestDto: UserRequestDto) => {
  const userId = Number(userRequestDto.userId);
  const user = await prisma.users.update({
    data: {
      username: userRequestDto.username,
      bio: userRequestDto.bio,
    },
    where: {
      id: userId,
    },
  });
  return user;
};

// refresh token으로 유저 검색
const findUserByRefreshToken = async (refreshToken: string) => {
  const data = prisma.users.findFirst({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!data) {
    return null;
  }

  return data;
};

const UserService = {
  updateUserInfo,
  findUserByRefreshToken,
};

export default UserService;
