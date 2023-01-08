import { DiaryGetRequestDto } from "./../interfaces/diary/DiaryRequestDto";
import { PrismaClient } from "@prisma/client";
import { UserRequestDto } from "../interfaces/user/UserRequestDto";
import { status } from "../constants";
import convertCategoryTopicToDto from "../utils/categoryTopic";
import dayjs from "dayjs";
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

const getDiaryByUserId = async (diaryGetRequestDto: DiaryGetRequestDto) => {
  const { userId, diaryId } = diaryGetRequestDto;

  const data = await prisma.diaries.findUnique({
    where: {
      id: +diaryId,
    },
    include: {
      _count: {
        select: { likes: true },
      },
    },
  });

  if (!data) {
    return null;
  }

  if (data.user_id !== +userId) {
    return status.UNAUTHORIZED;
  }

  // 해당 일기의 카테고리 및 랜덤 주제 가져오기
  const dto = await convertCategoryTopicToDto.convertTopicToDto(data.topic_id);

  if (!dto) {
    return status.INTERNAL_SERVER_ERROR;
  }

  const result = {
    content: data.content,
    category: dto.category,
    isPublic: data.is_public,
    createdAt: dayjs(data.created_at).format("YYYY-MM-DD HH:mm"),
    likeCnt: data._count.likes,
  };

  return result;
};

const getUserInfo = async (userId: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  const result = {
    username: user.username,
    targetLang: user.target_lang,
    bio: user.bio,
  };

  return result;
};

const getUserDiaryList = async (userId: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  const diaryList = await prisma.diaries.findMany({
    where: {
      user_id: userId,
    },
  });

  const userDiaryListGetResponseDto = [];

  for (let i = 0; i < diaryList.length; i++) {
    const topic = await prisma.topics.findFirst({
      where: {
        id: diaryList[i].topic_id,
      },
      select: {
        category_id: true,
      },
    });

    if (!topic) {
      return status.INTERNAL_SERVER_ERROR;
    }

    const diary = await prisma.diaries.findUnique({
      where: {
        id: diaryList[i].id,
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
    });

    if (!diary) {
      return status.INTERNAL_SERVER_ERROR;
    }

    const likeCnt = diary._count.likes;

    const UserDiaryGetResponseDto = {
      diaryId: diaryList[i].id,
      content: diaryList[i].content,
      createdAt: dayjs(diaryList[i].created_at).format("YYYY-MM-DD HH:mm"),
      isPublic: diaryList[i].is_public,
      likeCnt: likeCnt,
    };

    userDiaryListGetResponseDto.push(UserDiaryGetResponseDto);
  }

  return userDiaryListGetResponseDto;
};

const UserService = {
  updateUserInfo,
  findUserByRefreshToken,
  getDiaryByUserId,
  getUserInfo,
  getUserDiaryList,
};

export default UserService;
