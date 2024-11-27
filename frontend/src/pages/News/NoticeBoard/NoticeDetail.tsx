import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './NoticeDetailStyle';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { AuthContext } from '../../../context/AuthContext';
import { Modal, useModal } from '../../../components/Modal';
import { AlertTriangle, CheckCircle } from 'lucide-react';
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

const CATEGORY_MAP: { [key: string]: string } = {
  undergraduate: '학부',
  graduate: '대학원',
  employment: '취업',
  scholarship: '장학',
};

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();

  const [post, setPost] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const showConfirmModal = () => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#F59E0B" />
          게시글 삭제
        </Modal.Header>
        <Modal.Content>
          <p>정말로 이 게시글을 삭제하시겠습니까?</p>
          <p>삭제된 게시글은 복구할 수 없습니다.</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
          <S.DeleteButton onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </S.DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  const showResultModal = (success: boolean) => {
    const icon = success ? (
      <CheckCircle size={48} color="#38A169" />
    ) : (
      <AlertTriangle size={48} color="#E53E3E" />
    );
    const title = success ? '삭제 완료' : '삭제 실패';
    const message = success
      ? '게시글이 성공적으로 삭제되었습니다.'
      : '게시글 삭제 중 오류가 발생했습니다.';

    openModal(
      <>
        <Modal.Header>
          {icon}
          {title}
        </Modal.Header>
        <Modal.Content>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton
            onClick={() => {
              if (success) {
                navigate('/news/noticeboard');
              }
            }}
          />
        </Modal.Footer>
      </>,
    );
  };

  const handleDelete = async () => {
    if (!id || !post) return;

    try {
      setIsDeleting(true);
      await axios.delete(apiEndpoints.board.delete(id));
      showResultModal(true);
    } catch (error) {
      console.error('Failed to delete post:', error);
      showResultModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

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
            <span>{CATEGORY_MAP[post.category] || post.category}</span>
          </S.MetaItem>
          {auth?.isAuthenticated && (
            <S.ActionButtons>
              <S.EditButton
                onClick={() => navigate(`/news/noticeboard/edit/${post.id}`)}
              >
                수정
              </S.EditButton>
              <S.DeleteButton onClick={showConfirmModal} disabled={isDeleting}>
                {isDeleting ? '삭제중' : '삭제'}
              </S.DeleteButton>
            </S.ActionButtons>
          )}
        </S.MetaInfo>
      </S.Header>

      <S.QuillContent
        className="ql-editor"
        dangerouslySetInnerHTML={createMarkup(post.content)}
      />

      {post.file && (
        <S.FileSection>
          <S.FileLink
            href={post.file}
            target="_blank"
            rel="noopener noreferrer"
          >
            📎 첨부파일 다운로드
          </S.FileLink>
        </S.FileSection>
      )}

      <S.ButtonGroup>
        <S.Button onClick={() => navigate('/news/noticeboard')}>
          목록으로
        </S.Button>
        {auth?.isAuthenticated && (
          <>
            <S.EditButton
              onClick={() => navigate(`/news/noticeboard/edit/${post.id}`)}
            >
              수정하기
            </S.EditButton>
            <S.DeleteButton onClick={showConfirmModal} disabled={isDeleting}>
              {isDeleting ? '삭제 중...' : '삭제하기'}
            </S.DeleteButton>
          </>
        )}
      </S.ButtonGroup>
    </S.Container>
  );
};

export default NoticeDetail;
