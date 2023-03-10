import { PrismaClient } from "@prisma/client";
import { CategoryTopicDto } from "../interfaces/category/CategoryTopicDto";

const prisma = new PrismaClient();

const convertTopicToDto = async (topicId: number) => {
  const responseDto: CategoryTopicDto = {
    category: "",
    topic: "",
  };

  if (topicId === 0) {
    return responseDto;
  }

  const topic = await prisma.topics.findUnique({
    where: {
      id: topicId,
    },
  });

  if (!topic) {
    return null;
  }

  if (!topic.category_id) {
    return null;
  }

  const category = await prisma.categories.findUnique({
    where: {
      id: topic.category_id,
    },
  });

  if (!category) {
    return null;
  }

  responseDto.category = category.content;
  responseDto.topic = topic.content;

  return responseDto;
};

const convertCategoryTopicToDto = {
  convertTopicToDto,
};

export default convertCategoryTopicToDto;
