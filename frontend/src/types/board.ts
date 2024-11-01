// types/board.ts
export interface BoardReqDto {
  type: string;
  title: string;
  department: string;
  content?: string;
}

export interface BoardResDto {
  id: number;
  type: string;
  title: string;
  department: string;
  date: string;
  views: number;
  isNew?: boolean;
  content?: string;
}
