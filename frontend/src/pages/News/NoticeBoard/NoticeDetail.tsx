import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import * as S from './NoticeDetailStyle';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { AuthContext } from '../../../context/AuthContext';
import { Modal } from '../../../components/Modal';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '../../../common/Button/Button';
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

  const [post, setPost] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 모달 상태 관리
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', content: '' });
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

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

  const handleDelete = async () => {
    if (!id || !post) return;

    try {
      setIsDeleting(true);
      await axios.delete(apiEndpoints.board.delete(id));

      setModalType('success');
      setModalMessage({
        title: '삭제 완료',
        content: '게시글이 성공적으로 삭제되었습니다.',
      });
      setIsConfirmModalOpen(false);
      setIsResultModalOpen(true);
    } catch (error) {
      console.error('Failed to delete post:', error);
      setModalType('error');
      setModalMessage({
        title: '삭제 실패',
        content: '게시글 삭제 중 오류가 발생했습니다.',
      });
      setIsResultModalOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    setModalMessage({
      title: '게시글 삭제',
      content: '정말로 이 게시글을 삭제하시겠습니까?',
    });
    setIsConfirmModalOpen(true);
  };

  const handleResultModalClose = () => {
    setIsResultModalOpen(false);
    if (modalType === 'success') {
      navigate('/news/noticeboard');
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
    <>
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
                <S.DeleteButton
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                >
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
              <S.DeleteButton onClick={handleDeleteClick} disabled={isDeleting}>
                {isDeleting ? '삭제 중...' : '삭제하기'}
              </S.DeleteButton>
            </>
          )}
        </S.ButtonGroup>
      </S.Container>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
      >
        <Modal.Header>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" size={24} />
            {modalMessage.title}
          </h2>
        </Modal.Header>
        <Modal.Content>
          <p className="text-gray-600">{modalMessage.content}</p>
        </Modal.Content>
        <Modal.Footer>
          <Button
            variant="ghost"
            onClick={() => setIsConfirmModalOpen(false)}
            disabled={isDeleting}
          >
            취소
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 결과 알림 모달 */}
      <Modal isOpen={isResultModalOpen} onClose={handleResultModalClose}>
        <Modal.Header>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            {modalType === 'success' ? (
              <CheckCircle className="text-green-500" size={24} />
            ) : (
              <AlertTriangle className="text-red-500" size={24} />
            )}
            {modalMessage.title}
          </h2>
        </Modal.Header>
        <Modal.Content>
          <p className="text-gray-600">{modalMessage.content}</p>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="primary" onClick={handleResultModalClose}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NoticeDetail;
