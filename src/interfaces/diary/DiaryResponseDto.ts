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
}

export interface OpenDiaryResponseDto {
  diaryId: number;
  content: string;
  likeCnt: number;
  userId: number;
  username: string;
  isSeen: boolean;
  hasLike: number;
  createdAt: string;
}
