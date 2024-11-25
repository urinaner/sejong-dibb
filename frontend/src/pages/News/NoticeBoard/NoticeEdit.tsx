// src/pages/News/NoticeBoard/NoticeEdit.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import { useNoticeModals } from '../../../components/Modal/hooks/useNoticeModals';
import {
  AlertModal,
  ConfirmModal,
  FormErrorModal,
} from '../../../components/Modal/templates/NoticeModals';
import {
  Container,
  ContentWrapper,
  Header,
  FormSection,
  FormGroup,
  Label,
  Input,
  Select,
  QuillWrapper,
  ButtonGroup,
  CancelButton,
  SubmitButton,
  FileInputLabel,
  FileInput,
  FileList,
  FileItem,
} from './NoticeCreateStyle';

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

const NoticeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    modalState,
    showAlert,
    showFormError,
    showConfirm,
    closeAlert,
    closeConfirm,
    closeFormError,
    setConfirmLoading,
  } = useNoticeModals();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('undergraduate');
  const [file, setFile] = useState<File | null>(null);
  const [currentFile, setCurrentFile] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'undergraduate', label: '학부' },
    { value: 'graduate', label: '대학원' },
    { value: 'employment', label: '취업' },
    { value: 'scholarship', label: '장학' },
  ];

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const response = await axios.get<BoardDetail>(
          apiEndpoints.board.get(id),
        );
        const post = response.data;

        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
        if (post.file) {
          setCurrentFile(post.file);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        showAlert('오류 발생', '게시글을 불러오는데 실패했습니다.', 'error');
        navigate('/news/noticeboard');
      }
    };

    fetchPost();
  }, [id, navigate, showAlert]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    }),
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      showFormError('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      const updateData = {
        title: title.trim(),
        content: content.trim(),
        category: category,
        file: file ? file.name : currentFile,
      };

      await axios.post(apiEndpoints.board.update(id!), updateData);
      showAlert('수정 완료', '게시글이 성공적으로 수정되었습니다.', 'success');
      navigate(`/news/noticeboard/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
      showAlert('수정 실패', '게시글 수정 중 오류가 발생했습니다.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    showConfirm('파일 삭제', '첨부파일을 삭제하시겠습니까?', () => {
      setFile(null);
      setCurrentFile('');
      closeConfirm();
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container>
        <ContentWrapper>
          {/* Main form content */}
          <FormSection onSubmit={handleSubmit}>
            {/* Form fields ... */}
          </FormSection>
        </ContentWrapper>
      </Container>

      {/* Modals */}
      <AlertModal
        isOpen={modalState.alert.isOpen}
        onClose={closeAlert}
        title={modalState.alert.title}
        message={modalState.alert.message}
        type={modalState.alert.type}
      />

      <FormErrorModal
        isOpen={modalState.formError.isOpen}
        onClose={closeFormError}
        message={modalState.formError.message}
      />

      <ConfirmModal
        isOpen={modalState.confirm.isOpen}
        onClose={closeConfirm}
        onConfirm={modalState.confirm.onConfirm}
        title={modalState.confirm.title}
        message={modalState.confirm.message}
        confirmText={modalState.confirm.confirmText}
        cancelText={modalState.confirm.cancelText}
        isLoading={modalState.confirm.isLoading}
      />
    </>
  );
};

export default NoticeEdit;
