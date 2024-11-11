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

export interface NoticeForm {
  title: string;
  content: string;
  category: string;
}

export interface BoardPost {
  title: string;
  content: string;
  viewCount: number;
  writer: string;
  file: string;
  createDate: string;
  category: string;
  departmentId: number;
}
