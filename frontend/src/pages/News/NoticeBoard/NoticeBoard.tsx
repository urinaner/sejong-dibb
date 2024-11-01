import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Navigation,
  NavButton,
  Table,
  Th,
  Td,
  Tr,
  NoticeTag,
  NewTag,
  TitleLink,
  ViewCount,
  ErrorMessage,
  LoadingSpinner,
} from './NoticeBoardStyle';
import { apiEndpoints } from '../../../config/apiConfig';

interface NoticeItem {
  id: number;
  type: string;
  title: string;
  department: string;
  date: string;
  views: number;
  isNew?: boolean;
}

// 더미 데이터
const DUMMY_NOTICES: NoticeItem[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  type:
    index % 5 === 0 ? '공지' : ['전체', '학부', '대학원', '선택'][index % 4],
  title: `[${index % 5 === 0 ? '공지사항' : '일반'}] 테스트 게시글 ${index + 1}`,
  department: `테스트학과 ${(index % 3) + 1}`,
  date: new Date(2024, 0, index + 1).toISOString().split('T')[0],
  views: Math.floor(Math.random() * 1000),
  isNew: index < 5, // 최근 5개 게시글에 NEW 표시
}));

const NoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<NoticeItem[]>(DUMMY_NOTICES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('전체');

  // API 연동 코드 (주석 처리)
  /*
  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    try {
      const encodedType = encodeURIComponent(selectedType);
      const response = await axios.get<NoticeItem[]>(
        `${apiEndpoints.board.list}`,
      );

      const now = new Date();
      const processedNotices = response.data.map((notice) => ({
        ...notice,
        isNew:
          now.getTime() - new Date(notice.date).getTime() <=
          7 * 24 * 60 * 60 * 1000,
      }));

      setNotices(processedNotices);
    } catch (error: any) {
      console.error('Failed to fetch notices:', error);
      let errorMessage = '게시글을 불러오는데 실패했습니다.';

      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = '로그인이 필요합니다.';
            break;
          case 403:
            errorMessage = '접근 권한이 없습니다.';
            break;
          default:
            errorMessage =
              error.response.data?.message || '서버 오류가 발생했습니다.';
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  */

  // 더미 데이터를 사용한 필터링 함수
  const filterNotices = (type: string) => {
    setLoading(true);
    try {
      const filtered =
        type === '전체'
          ? DUMMY_NOTICES
          : DUMMY_NOTICES.filter((notice) => notice.type === type);
      setNotices(filtered);
      setError(null);
    } catch (error) {
      setError('데이터 필터링 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 타입 필터 변경 핸들러
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  // 선택된 타입이 변경될 때마다 필터링 적용
  useEffect(() => {
    filterNotices(selectedType);
  }, [selectedType]);

  const NOTICE_TYPES = ['전체', '학부', '대학원', '선택'];

  return (
    <Container>
      <Navigation>
        {NOTICE_TYPES.map((type) => (
          <NavButton
            key={type}
            isActive={selectedType === type}
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </NavButton>
        ))}
      </Navigation>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {loading ? (
        <LoadingSpinner>Loading...</LoadingSpinner>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>분류</Th>
              <Th>제목</Th>
              <Th>작성자</Th>
              <Th>등록일</Th>
              <Th style={{ textAlign: 'right' }}>조회수</Th>
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <Tr key={notice.id}>
                <Td>
                  {notice.type === '공지' ? (
                    <NoticeTag>공지</NoticeTag>
                  ) : (
                    notice.type
                  )}
                </Td>
                <Td>
                  <TitleLink
                    onClick={() =>
                      (window.location.href = `/notice/${notice.id}`)
                    }
                  >
                    {notice.title}
                    {notice.isNew && <NewTag>NEW</NewTag>}
                  </TitleLink>
                </Td>
                <Td>{notice.department}</Td>
                <Td>{notice.date}</Td>
                <ViewCount>{notice.views.toLocaleString()}</ViewCount>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default NoticeBoard;
