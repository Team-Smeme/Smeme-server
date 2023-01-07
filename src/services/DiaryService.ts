import { DiaryDeleteRequestDto } from "./../interfaces/diary/DiaryRequestDto";
import { PrismaClient } from "@prisma/client";
import { DiaryRequestDto } from "../interfaces/diary/DiaryRequestDto";
import dayjs from "dayjs";
import { status } from "../constants";
import {
  DiaryResponseDto,
  OpenDiaryResponseDto,
} from "../interfaces/diary/DiaryResponseDto";
import statusCode from "../constants/statusCode";

const prisma = new PrismaClient();

const createDiary = async (diaryRequestDto: DiaryRequestDto) => {
  const user = await prisma.users.findUnique({
    where: {
      id: +diaryRequestDto.userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  const topic = await prisma.topics.findUnique({
    where: {
      content: diaryRequestDto.topic,
    },
  });

  if (!topic) {
    return null;
  }

  const date = dayjs().format("YYYY-MM-DD HH:mm");

  const diary = await prisma.diaries.create({
    data: {
      user_id: +diaryRequestDto.userId,
      topic_id: topic.id,
      content: diaryRequestDto.content,
      target_lang: diaryRequestDto.targetLang,
      is_public: diaryRequestDto.isPublic,
      created_at: new Date(date),
    },
  });

  return {
    diaryId: diary.id,
  };
};

const getDiaryById = async (diaryId: number, userId: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return statusCode.UNAUTHORIZED;
  }

  const diary = await prisma.diaries.findUnique({
    where: {
      id: diaryId,
    },
  });

  if (!diary) {
    return null;
  }

  const topic = await prisma.topics.findUnique({
    where: {
      id: diary.topic_id,
    },
  });

  if (!topic) {
    return null;
  }

  const category = await prisma.categories.findUnique({
    where: {
      id: topic.category_id,
    },
  });

  if (!category) {
    return statusCode.INTERNAL_SERVER_ERROR;
  }

  const likeCnt = await prisma.likes.count({
    where: {
      diary_id: diaryId,
    },
  });

  const hasLike =
    (await prisma.likes.count({
      where: {
        diary_id: diaryId,
        user_id: userId,
      },
    })) > 0
      ? true
      : false;

  const writer = await prisma.users.findUnique({
    where: {
      id: diary.user_id,
    },
  });

  if (!writer) {
    return statusCode.INTERNAL_SERVER_ERROR;
  }

  const date = dayjs(diary.created_at).format("YYYY-MM-DD HH:mm");

  const data: DiaryResponseDto = {
    diaryId: diaryId,
    content: diary.content,
    category: category.content,
    topic: topic.content,
    likeCnt: likeCnt,
    createdAt: date,
    userId: writer.id,
    username: writer.username as string,
    bio: writer.bio as string,
    hasLike: hasLike,
  };

  return data;
};

const getOpenDiaries = async (userId: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return statusCode.UNAUTHORIZED;
  }

  let diaries = await prisma.diaries.findMany();
  diaries = diaries.filter((diary) => diary.user_id != userId);

  const result: OpenDiaryResponseDto[] = [];

  const promises = diaries.map(async (diary) => {
    const likeCnt = await prisma.likes.count({
      where: {
        diary_id: diary.id,
      },
    });

    const isSeen =
      (await prisma.histories.count({
        where: {
          user_id: userId,
          diary_id: diary.id,
        },
      })) > 0
        ? true
        : false;

    const hasLike =
      (await prisma.likes.count({
        where: {
          diary_id: diary.id,
          user_id: userId,
        },
      })) > 0
        ? true
        : false;

    const writer = await prisma.users.findUnique({
      where: {
        id: diary.user_id,
      },
    });

    if (!writer) {
      return statusCode.INTERNAL_SERVER_ERROR;
    }

    const data: OpenDiaryResponseDto = {
      diaryId: diary.id,
      content: diary.content,
      likeCnt: likeCnt,
      userId: writer.id,
      username: writer.username as string,
      isSeen: isSeen,
      hasLike: hasLike,
      createdAt: dayjs(diary.created_at).format("YYYY-MM-DD HH:mm"),
    };

    result.push(data);
  });

  await Promise.all(promises);

  result.sort(function (a, b) {
    return a.createdAt > b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0;
  });

  return result;
};

const deleteDiary = async (diaryDeleteRequestDto: DiaryDeleteRequestDto) => {
  const { userId, diaryId } = diaryDeleteRequestDto;

  const user = await prisma.users.findUnique({
    where: {
      id: +userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  const data = await prisma.diaries.delete({
    where: {
      id: +diaryId,
    },
  });

  return data;
};

const diaryService = {
  createDiary,
  getDiaryById,
  getOpenDiaries,
  deleteDiary,
};

export default diaryService;
