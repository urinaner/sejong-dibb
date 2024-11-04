import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './NoticeDetailStyle';
import { useNavigate } from 'react-router-dom';

interface BoardDetail {
  id: number;
  title: string;
  content: string;
  writer: string;
  createDate: string;
  viewCount: number;
  file?: string;
  category: string;
}

const generateDummyDetail = (id: string): BoardDetail => {
  const categoryTypes = ['학부', '대학원'];
  const category = categoryTypes[Math.floor(Math.random() * 2)];

  return {
    id: parseInt(id),
    title: `${category} 공지사항 ${id}`,
    content: `게시글 내용 ${id}\n\n이것은 더미 데이터로 생성된 게시글 내용입니다.\n첫 번째 문단입니다.\n\n두 번째 문단입니다.\n\n세 번째 문단은 조금 더 길게 작성되어 있습니다. 게시글의 내용이 여러 줄에 걸쳐 표시되는 것을 테스트하기 위한 내용입니다.`,
    writer: `작성자${Math.floor(Math.random() * 5) + 1}`,
    createDate: new Date(2024, 0, parseInt(id)).toISOString().split('T')[0],
    viewCount: Math.floor(Math.random() * 100),
    category: category,
    file: Math.random() > 0.5 ? '첨부파일.pdf' : undefined,
  };
};

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        /* API 호출 코드 주석처리
        const response = await axios.get<BoardDetail>(
          apiEndpoints.board.get(id)
        );
        setPost(response.data);
        */

        // 더미 데이터 사용
        const dummyData = generateDummyDetail(id);
        setPost(dummyData);
      } catch (error: any) {
        console.error('Failed to fetch post details:', error);
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [id]);

  if (loading) return <S.Loading>Loading...</S.Loading>;
  if (error) return <S.Error>{error}</S.Error>;
  if (!post) return <S.Error>게시글을 찾을 수 없습니다.</S.Error>;

  return (
    <S.Container>
      <S.Header>
        <S.Title>{post.title}</S.Title>
        <S.MetaInfo>
          <S.MetaItem>
            <S.Label>작성자:</S.Label>
            <span>{post.writer}</span>
          </S.MetaItem>
          <S.MetaItem>
            <S.Label>작성일:</S.Label>
            <span>{post.createDate}</span>
          </S.MetaItem>
          <S.MetaItem>
            <S.Label>조회수:</S.Label>
            <span>{post.viewCount}</span>
          </S.MetaItem>
          <S.MetaItem>
            <S.Label>카테고리:</S.Label>
            <span>{post.category}</span>
          </S.MetaItem>
        </S.MetaInfo>
      </S.Header>

      <S.Content>{post.content}</S.Content>

      {post.file && (
        <S.FileSection>
          <S.FileLink href={post.file}>📎 첨부파일 다운로드</S.FileLink>
        </S.FileSection>
      )}

      <S.ButtonGroup>
        <S.Button onClick={() => navigate('/news/noticeboard')}>
          목록으로
        </S.Button>
      </S.ButtonGroup>
    </S.Container>
  );
};

export default NoticeDetail;
