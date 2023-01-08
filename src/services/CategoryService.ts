import { PrismaClient } from "@prisma/client";
import {
  CategoryListResponseDto,
  CategoryResponseDto,
} from "../interfaces/category/CategoryResponseDto";

const prisma = new PrismaClient();

const getTopics = async () => {
  const topics = await prisma.topics.findMany();

  const result: CategoryResponseDto[] = [];

  const promises = topics.map(async (topic) => {
    const category = await prisma.categories.findUnique({
      where: {
        id: topic.category_id,
      },
    });

    if (!category) {
      throw new Error("none category");
    }

    const data: CategoryResponseDto = {
      category: category.content,
      topic: topic.content,
    };

    result.push(data);
  });

  await Promise.all(promises);

  const random = Math.random() * (result.length - 1);

  return result[random];
};

const getCategories = async () => {
  const categories = await prisma.categories.findMany();

  const result: CategoryListResponseDto[] = [];

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
  getTopics,
  getCategories,
};

export default categoryService;
