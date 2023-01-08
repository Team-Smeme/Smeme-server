import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { status } from "../constants";
import {
  DiaryRequestDto,
  DiaryDeleteRequestDto,
  DiaryUpdateRequestDto,
} from "./../interfaces/diary/DiaryRequestDto";
import {
  DiaryResponseDto,
  OpenDiaryResponseDto,
} from "../interfaces/diary/DiaryResponseDto";
import { DiaryLikeDto } from "../interfaces/diary/DiaryLikeDto";
import convertCategoryTopicToDto from "../utils/categoryTopic";

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

  let topicId = 1;

  if (diaryRequestDto.topic) {
    const topic = await prisma.topics.findUnique({
      where: {
        content: diaryRequestDto.topic,
      },
    });

    if (!topic) {
      return null;
    }

    topicId = topic.id;
  }

  const date = dayjs().format("YYYY-MM-DD HH:mm");

  const diary = await prisma.diaries.create({
    data: {
      user_id: +diaryRequestDto.userId,
      topic_id: topicId,
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

  return data;
};

const getDiaryById = async (diaryId: number, userId: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  const diary = await prisma.diaries.findUnique({
    where: {
      id: diaryId,
    },
  });

  if (!diary) {
    return null;
  }

  const dto = await convertCategoryTopicToDto.convertTopicToDto(diary.topic_id);

  if (!dto) {
    return status.INTERNAL_SERVER_ERROR;
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
    return status.INTERNAL_SERVER_ERROR;
  }

  const date = dayjs(diary.created_at).format("YYYY-MM-DD HH:mm");

  const data: DiaryResponseDto = {
    diaryId: diaryId,
    content: diary.content,
    category: dto.category,
    topic: dto.topic,
    likeCnt: likeCnt,
    createdAt: date,
    userId: writer.id,
    username: writer.username as string,
    bio: writer.bio as string,
    hasLike: hasLike,
  };

  await prisma.histories.create({
    data: {
      user_id: userId,
      diary_id: diaryId,
    },
  });

  return data;
};

const getOpenDiaries = async (
  userId: number,
  categoryId: number | undefined,
) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  let diaries = await prisma.diaries.findMany();

  diaries = diaries.filter((diary) => diary.user_id != userId);

  if (categoryId !== undefined) {
    const topicIds = await prisma.topics.findMany({
      where: {
        category_id: categoryId,
      },
      select: {
        id: true,
      },
    });

    const arr = topicIds.map((topicId) => topicId.id);

    diaries = diaries.filter((diary) => arr.includes(diary.topic_id));
  }

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
      return status.INTERNAL_SERVER_ERROR;
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

  const dto = await convertCategoryTopicToDto.convertTopicToDto(data.topic_id);

  if (!dto) {
    return status.INTERNAL_SERVER_ERROR;
  }

  const diaryUpdateResponseDto = {
    content: data.content,
    isPublic: data.is_public,
    topic: dto.topic,
    category: dto.category,
    targetLang: data.target_lang,
  };

  return diaryUpdateResponseDto;
};

const getLikeDiary = async (userId: number, diaryId: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return status.UNAUTHORIZED;
  }

  const diary = await prisma.diaries.findUnique({
    where: {
      id: diaryId,
    },
  });

  if (!diary) {
    return status.BAD_REQUEST;
  }

  let hasLike =
    (await prisma.likes.count({
      where: {
        user_id: userId,
        diary_id: diaryId,
      },
    })) > 0
      ? true
      : false;

  if (hasLike) {
    await prisma.likes.deleteMany({
      where: {
        user_id: userId,
        diary_id: diaryId,
      },
    });
    hasLike = false;
  } else {
    await prisma.likes.create({
      data: {
        user_id: userId,
        diary_id: diaryId,
      },
    });
    hasLike = true;
  }

  const data: DiaryLikeDto = {
    hasLike: hasLike,
  };

  return data;
};

const diaryService = {
  createDiary,
  deleteDiary,
  getDiaryById,
  getOpenDiaries,
  updateDiary,
  getLikeDiary,
};

export default diaryService;
