import { PrismaClient } from "@prisma/client";
import statusCode from "../constants/statusCode";
import { ScrapRequestDto } from "../interfaces/scrap/ScrapRequestDto";

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

  const scrap = await prisma.scraps.create({
    data: {
      user_id: +scrapRequestDto.userId,
      diary_id: +scrapRequestDto.diaryId,
      paragraph: scrapRequestDto.paragraph,
    },
  });

  return scrap.id;
};

const scrapService = {
  createScrap,
};

export default scrapService;
