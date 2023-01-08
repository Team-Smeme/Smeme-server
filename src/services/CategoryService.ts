import { PrismaClient } from "@prisma/client";
import {
  CategoryResponseDto,
  RandomTopicResponseDto,
} from "../interfaces/category/CategoryResponseDto";

const prisma = new PrismaClient();

const getRandomTopic = async () => {
  let topics = await prisma.topics.findMany();
  topics = topics.filter((topic) => topic.id !== 0);

  const random = Math.round(Math.random() * (topics.length - 1));

  const data: RandomTopicResponseDto = {
    id: topics[random].id,
    content: topics[random].content,
  };

  return data;
};

const getCategories = async () => {
  const categories = await prisma.categories.findMany();

  const result: CategoryResponseDto[] = [];

  categories.map((category) => {
    result.push({
      id: category.id,
      content: category.content,
    });
  });

  return {
    categories: result,
  };
};

const categoryService = {
  getRandomTopic,
  getCategories,
};

export default categoryService;
