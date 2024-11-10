import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './NoticeDetailStyle';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

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
        const response = await axios.get<BoardDetail>(
          apiEndpoints.board.get(id),
        );

        setPost(response.data);
      } catch (error: any) {
        console.error('Failed to fetch post details:', error);
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  const createMarkup = (content: string) => {
    return {
      __html: DOMPurify.sanitize(content),
    };
  };

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

      <S.QuillContent
        className="ql-editor"
        dangerouslySetInnerHTML={createMarkup(post.content)}
      />

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
