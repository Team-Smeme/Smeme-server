import { PrismaClient } from "@prisma/client";
import statusCode from "../constants/statusCode";
import { ScrapRequestDto } from "../interfaces/scrap/ScrapRequestDto";
import { ScrapResponseDto } from "../interfaces/scrap/ScrapResponseDto";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const createScrap = async (scrapRequestDto: ScrapRequestDto) => {
  const user = await prisma.users.findUnique({
    where: {
      id: +scrapRequestDto.userId,
    },
  });

  if (!user) {
    return statusCode.UNAUTHORIZED;
  }

  const diary = await prisma.diaries.findUnique({
    where: {
      id: +scrapRequestDto.diaryId,
    },
  });

  if (!diary) {
    return statusCode.BAD_REQUEST;
  }

  const date = dayjs().format("YYYY-MM-DD HH:mm");

  const scrap = await prisma.scraps.create({
    data: {
      user_id: +scrapRequestDto.userId,
      diary_id: +scrapRequestDto.diaryId,
      paragraph: scrapRequestDto.paragraph,
      created_at: new Date(date),
    },
  });

  return scrap.id;
};

const getScrapsByUser = async (userId: number) => {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return statusCode.UNAUTHORIZED;
  }

  const scraps = await prisma.scraps.findMany({
    where: {
      user_id: userId,
    },
  });

  const result: ScrapResponseDto[] = [];

  scraps.map((scrap) => {
    result.push({
      id: scrap.id,
      paragraph: scrap.paragraph,
    });
  });

  return result;
};

const scrapService = {
  createScrap,
  getScrapsByUser,
};

export default scrapService;
