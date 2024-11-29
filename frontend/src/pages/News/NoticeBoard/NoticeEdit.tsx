import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import { Modal, useModal } from '../../../components/Modal';
import { AlertTriangle, CheckCircle } from 'lucide-react';
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
  const { openModal } = useModal();

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
        openModal(
          <>
            <Modal.Header>
              <AlertTriangle size={48} color="#E53E3E" />
              데이터 로드 실패
            </Modal.Header>
            <Modal.Content>
              <p>게시글을 불러오는데 실패했습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Modal.CloseButton
                onClick={() => navigate('/news/noticeboard')}
              />
            </Modal.Footer>
          </>,
        );
      }
    };

    fetchPost();
  }, [id, navigate, openModal]);

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

      openModal(
        <>
          <Modal.Header>
            <CheckCircle size={48} color="#38A169" />
            수정 완료
          </Modal.Header>
          <Modal.Content>
            <p>게시글이 성공적으로 수정되었습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton
              onClick={() => navigate(`/news/noticeboard/${id}`)}
            />
          </Modal.Footer>
        </>,
      );
    } catch (error) {
      console.error('Error updating post:', error);
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            수정 실패
          </Modal.Header>
          <Modal.Content>
            <p>게시글 수정 중 오류가 발생했습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
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

  if (loading) {
    return <div>Loading...</div>;
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
              {categories.map((cat) => (
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
