import { PrismaClient } from "@prisma/client";
import { CategoryResponseDto } from "../interfaces/category/CategoryResponseDto";

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

  return result;
};

const categoryService = {
  getTopics,
};

export default categoryService;
