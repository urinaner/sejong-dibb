export * from './news';

// common에서 news.ts에 중복되지 않는 타입만 export
export type { PaginatedResponse } from './common';
