import { UserDiaryListGetResponseDto } from "./../interfaces/diary/DiaryResponseDto";
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
    topicId: data.topic_id,
    topic: dto.topic,
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

const getUserDiaryList = async (userId: number, date: string | undefined) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  let diaries = await prisma.diaries.findMany({
    where: {
      user_id: userId,
    },
  });

  if (date !== undefined) {
    diaries = diaries.filter(
      (diary) => String(dayjs(diary.created_at).format("YYYY-MM-DD")) == date,
    );
  }

  const userDiaryListGetResponseDto: UserDiaryListGetResponseDto[] = [];

  const promises = diaries.map(async (diary) => {
    const likeCnt = await prisma.likes.count({
      where: {
        diary_id: diary.id,
      },
    });
    const data = {
      diaryId: diary.id,
      content: diary.content,
      createdAt: dayjs(diary.created_at).format("YYYY-MM-DD HH:mm"),
      isPublic: diary.is_public,
      likeCnt: likeCnt,
    };

    userDiaryListGetResponseDto.push(data);
  });
  await Promise.all(promises);

  userDiaryListGetResponseDto.sort(function (a, b) {
    return a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
  });

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
