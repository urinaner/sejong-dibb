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
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import 'react-quill/dist/quill.snow.css';
import useNotice from '../../../hooks/queries/useNotice';
import Container from '../../../styles/Container';

interface BoardDetail {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdDate: string;
  viewCount: number;
  fileList?: string[];
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
  const { useDeleteNotice } = useNotice;
  const deleteNoticeMutation = useDeleteNotice();

  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(
    new Set(),
  );
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

  const getFileName = (fileUrl: string): string => {
    try {
      const decodedUrl = decodeURIComponent(fileUrl);
      const urlParts = decodedUrl.split('/');
      return urlParts[urlParts.length - 1];
    } catch {
      return fileUrl;
    }
  };

  const showErrorModal = (title: string, message: string) => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          {title}
        </Modal.Header>
        <Modal.Content>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
        </Modal.Footer>
      </>,
    );
  };

  const handleFileDownload = async (fileUrl: string) => {
    if (downloadingFiles.has(fileUrl)) return;

    try {
      setDownloadingFiles((prev) => new Set(prev).add(fileUrl));
      const fileName = getFileName(fileUrl);

      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileName);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
      showErrorModal(
        '파일 다운로드 실패',
        '파일을 다운로드하는 중 오류가 발생했습니다.',
      );
    } finally {
      setDownloadingFiles((prev) => {
        const newSet = new Set(prev);
        newSet.delete(fileUrl);
        return newSet;
      });
    }
  };

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
      await deleteNoticeMutation.mutateAsync(post.id);
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

  if (loading) {
    return <LoadingSpinner text="게시글을 불러오는 중입니다..." />;
  }

  if (error) {
    return <S.Error>{error}</S.Error>;
  }

  if (!post) {
    return <S.Error>게시글을 찾을 수 없습니다.</S.Error>;
  }

  return (
    <Container>
      <S.ContentContainer>
        <S.Header>
          <S.Title>{post.title}</S.Title>
          <S.MetaInfo>
            <S.MetaItem>
              <S.Label>작성자:</S.Label>
              <span>{post.writer}</span>
            </S.MetaItem>
            <S.MetaItem>
              <S.Label>작성일:</S.Label>
              <span>{post.createdDate}</span>
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
                  onClick={showConfirmModal}
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

        {post.fileList && post.fileList.length > 0 && (
          <S.FileSection>
            <S.FileListHeader>
              첨부파일 ({post.fileList.length})
            </S.FileListHeader>
            <S.FileList>
              {post.fileList.map((fileUrl, index) => (
                <S.FileItem key={index}>
                  <S.FileIcon>📎</S.FileIcon>
                  <S.FileName>{getFileName(fileUrl)}</S.FileName>
                  <S.FileDownloadButton
                    onClick={() => handleFileDownload(fileUrl)}
                    disabled={downloadingFiles.has(fileUrl)}
                  >
                    {downloadingFiles.has(fileUrl)
                      ? '다운로드 중...'
                      : '다운로드'}
                  </S.FileDownloadButton>
                </S.FileItem>
              ))}
            </S.FileList>
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
      </S.ContentContainer>
    </Container>
  );
};

export default NoticeDetail;
