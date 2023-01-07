import { DiaryDeleteRequestDto } from "./../interfaces/diary/DiaryRequestDto";
import { PrismaClient } from "@prisma/client";
import { DiaryRequestDto } from "../interfaces/diary/DiaryRequestDto";
import dayjs from "dayjs";
import { status } from "../constants";
import { DiaryResponseDto } from "../interfaces/diary/DiaryResponseDto";
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

  const date = dayjs(diary.created_at).format("YYYY-MM-DD HH:mm");

  const data: DiaryResponseDto = {
    diaryId: diaryId,
    content: diary.content,
    category: category.content,
    topic: topic.content,
    likeCnt: likeCnt,
    createdAt: date,
    userId: userId,
    username: user.username as string,
    bio: user.bio as string,
  };

  return data;
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
  deleteDiary,
};

export default diaryService;
