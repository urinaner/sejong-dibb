import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Modal, useModal } from '../../../components/Modal';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import useNotice from '../../../hooks/queries/useNotice';
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

const CATEGORIES = [
  { value: 'undergraduate', label: '학부' },
  { value: 'graduate', label: '대학원' },
  { value: 'employment', label: '취업' },
  { value: 'scholarship', label: '장학' },
] as const;

const NoticeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('undergraduate');
  const [file, setFile] = useState<File | null>(null);
  const [currentFile, setCurrentFile] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { useGetNotice, useUpdateNotice } = useNotice;
  const { data: post, isLoading, error, refetch } = useGetNotice(Number(id));
  const updateNoticeMutation = useUpdateNotice();

  React.useEffect(() => {
    if (post) {
      // post가 직접 NoticeItem
      console.log('Loading post data:', post);
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
      if (post.fileList && post.fileList.length > 0) {
        setCurrentFile(post.fileList[0]);
      }
    }
  }, [post]);

  // Add refetch effect
  React.useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  // Add refetch effect
  React.useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

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

  const showFormError = (message: string) => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          입력 오류
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

  const showResultModal = (success: boolean, message: string) => {
    openModal(
      <>
        <Modal.Header>
          {success ? (
            <CheckCircle size={48} color="#38A169" />
          ) : (
            <AlertTriangle size={48} color="#E53E3E" />
          )}
          {success ? '수정 완료' : '수정 실패'}
        </Modal.Header>
        <Modal.Content>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton
            onClick={() => {
              if (success) {
                navigate(`/news/noticeboard/${id}`);
              }
            }}
          />
        </Modal.Footer>
      </>,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      showFormError('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      await updateNoticeMutation.mutateAsync({
        id: Number(id),
        data: {
          title: title.trim(),
          content: content.trim(),
          category: category,
          departmentId: 1,
          writer: post?.writer || '',
          createDate: post?.createdDate || new Date().toISOString(),
        },
        files: file ? [file] : undefined,
      });

      showResultModal(true, '게시글이 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('Error updating post:', error);
      showResultModal(false, '게시글 수정 중 오류가 발생했습니다.');
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
    setFile(null);
    setCurrentFile('');
  };

  if (isLoading) {
    return <LoadingSpinner text="게시글 정보를 불러오는 중입니다..." />;
  }

  if (error) {
    return (
      <Container>
        <ContentWrapper>
          <Header>
            <h1>오류 발생</h1>
            <p>게시글을 불러오는데 실패했습니다.</p>
          </Header>
          <ButtonGroup>
            <CancelButton onClick={() => navigate('/news/noticeboard')}>
              목록으로 돌아가기
            </CancelButton>
          </ButtonGroup>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <h1>게시글 수정</h1>
        </Header>

        <FormSection onSubmit={handleSubmit}>
          <FormGroup>
            <Label>카테고리</Label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>제목</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label>첨부파일</Label>
            <FileInputLabel>
              📎 파일 선택
              <FileInput
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
              />
            </FileInputLabel>
            {(file || currentFile) && (
              <FileList>
                <FileItem>
                  {file ? file.name : currentFile}
                  <button type="button" onClick={handleRemoveFile}>
                    ×
                  </button>
                </FileItem>
              </FileList>
            )}
          </FormGroup>

          <FormGroup>
            <Label>내용</Label>
            <QuillWrapper>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                placeholder="내용을 입력하세요"
              />
            </QuillWrapper>
          </FormGroup>

          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={() => navigate(`/news/noticeboard/${id}`)}
            >
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '수정 중...' : '수정하기'}
            </SubmitButton>
          </ButtonGroup>
        </FormSection>
      </ContentWrapper>
    </Container>
  );
};

export default NoticeEdit;
