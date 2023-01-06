export interface DiaryRequestDto {
  userId: string;
  content: string;
  targetLang: string;
  category: string;
  topic: string;
  isPublic: boolean;
}
