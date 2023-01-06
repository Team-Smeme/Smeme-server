import { DiaryGetRequestDto } from "./../interfaces/diary/DiaryRequestDto";
import { PrismaClient } from "@prisma/client";
import { UserRequestDto } from "../interfaces/user/UserRequestDto";
import { status } from "../constants";
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

  if (data?.user_id !== +userId) {
    return status.BAD_REQUEST;
  }

  if (!data) {
    return null;
  }

  const categoryData = await prisma.topics.findFirst({
    where: {
      id: data.topic_id,
    },
    select: {
      category_id: true,
    },
  });

  const categoryId = categoryData?.category_id as number;

  const category = await prisma.categories.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      content: true,
    },
  });

  const result = {
    content: data.content,
    category: category?.content,
    isPublic: data.is_public,
    createdAt: data.created_at,
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

  const resultList = [];

  for (let i = 0; i < diaryList.length; i++) {
    const topic = await prisma.topics.findFirst({
      where: {
        id: diaryList[i].topic_id,
      },
      select: {
        category_id: true,
      },
    });
    const categoryId = topic?.category_id as number;

    const category = await prisma.categories.findFirst({
      where: {
        id: categoryId,
      },
      select: {
        content: true,
      },
    });

    const categoryContent = category?.content as string;

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

    const likeCnt = diary?._count.likes;

    const result = {
      diaryId: diaryList[i].id,
      content: diaryList[i].content,
      category: categoryContent,
      createdAt: diaryList[i].created_at,
      isPublic: diaryList[i].is_public,
      likeCnt: likeCnt,
    };

    resultList.push(result);
  }

  return resultList;
};

const UserService = {
  updateUserInfo,
  findUserByRefreshToken,
  getDiaryByUserId,
  getUserInfo,
  getUserDiaryList,
};

export default UserService;
