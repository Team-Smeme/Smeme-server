export interface DiaryResponseDto {
  diaryId: number;
  content: string;
  category: string;
  topic: string;
  likeCnt: number;
  createdAt: string;
  userId: number;
  username: string;
  bio: string;
  hasLike: boolean;
}
