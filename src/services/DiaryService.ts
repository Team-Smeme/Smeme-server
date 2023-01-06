import {
  DiaryDeleteRequestDto,
  DiaryUpdateRequestDto,
} from "./../interfaces/diary/DiaryRequestDto";
import { PrismaClient } from "@prisma/client";
import { DiaryRequestDto } from "../interfaces/diary/DiaryRequestDto";
import dayjs from "dayjs";
import { status } from "../constants";

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
  console.log(data);

  if (!data) {
    return null;
  }

  return data;
};

const updateDiary = async (diaryUpdateRequestDto: DiaryUpdateRequestDto) => {
  const user = await prisma.users.findUnique({
    where: {
      id: +diaryUpdateRequestDto.userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  const data = await prisma.diaries.update({
    data: {
      content: diaryUpdateRequestDto.content,
      is_public: diaryUpdateRequestDto.isPublic,
      target_lang: diaryUpdateRequestDto.targetLang,
    },
    where: {
      id: +diaryUpdateRequestDto.diaryId,
    },
  });

  if (!data) {
    return status.BAD_REQUEST;
  }

  const topic = await prisma.topics.findFirst({
    where: {
      id: data.topic_id,
    },
    select: {
      category_id: true
    }
  })

  const categoryId = topic?.category_id as number;

  const category = await prisma.categories.findFirst({
    where: {
      id: categoryId,
    },
    select: {
      content: true,
    },
  });

  const result = {
    content: data.content,
    isPublic: data.is_public,
    category: category?.content as string,
    targetLang: data.target_lang,
  };

  return result;
};

const diaryService = {
  createDiary,
  deleteDiary,
  updateDiary,
};

export default diaryService;
