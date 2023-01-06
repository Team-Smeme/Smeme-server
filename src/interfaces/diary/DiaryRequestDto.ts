export interface DiaryRequestDto {
  userId: string;
  content: string;
  targetLang: string;
  category: string;
  topic: string;
  isPublic: boolean;
}

export interface DiaryDeleteRequestDto {
  userId: string;
  diaryId: string;
}

export interface DiaryGetRequestDto {
  userId: string;
  diaryId: string;
}
