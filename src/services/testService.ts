import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// example

//* userId로 유저 조회
const getUserById = async (userId: number) => {
  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });

  // return user;
};

//* 유저 정보 생성


//* 유저 정보 전체 조회


//* 유저 정보 수정


//* 유저 정보 삭제



const testService = {
  getUserById,
};

export default testService;