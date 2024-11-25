import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
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
import { apiEndpoints } from '../../../config/apiConfig';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import {
  AlertModal,
  FormErrorModal,
} from '../../../components/Modal/templates/NoticeModals';
import { useNoticeModals } from '../../../components/Modal/hooks/useNoticeModals';

interface PostFormData {
  title: string;
  content: string;
  writer: string;
  file: string;
  createDate: string;
  category: string;
  departmentId: number;
}

const NoticeCreate: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('undergraduate');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const quillRef = useRef<ReactQuill>(null);
  const auth = useContext(AuthContext);

  const {
    showAlert,
    showFormError,
    alertModal,
    formErrorModal,
    closeAlert,
    closeFormError,
  } = useNoticeModals();

  if (!auth) {
    throw new Error('AuthContext must be used within AuthProvider');
  }

  const categories = [
    { value: 'undergraduate', label: '학부' },
    { value: 'graduate', label: '대학원' },
    { value: 'employment', label: '취업' },
    { value: 'scholarship', label: '장학' },
  ];

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

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'color',
      'background',
      'link',
      'image',
    ],
    [],
  );

  const handleChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      showFormError('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      const postData = {
        title: title.trim(),
        content: content.trim(),
        writer: auth.user || 'admin',
        file: file ? file.name : '',
        createDate: new Date().toISOString().split('T')[0],
        category: category,
        departmentId: 1,
      };

      const response = await axios.post(apiEndpoints.board.create, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        showAlert('등록 완료', '게시글이 성공적으로 등록되었습니다.');
      }
    } catch (error: any) {
      console.error('Error posting article:', error);
      showAlert('등록 실패', '게시글 등록 중 오류가 발생했습니다.', 'error');
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
  };

  // 알림 모달이 닫힐 때 목록으로 이동
  const handleAlertClose = () => {
    closeAlert();
    if (alertModal.type === 'success') {
      navigate('/news/noticeboard');
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <h1>게시글 작성</h1>
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
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            {file && (
              <FileList>
                <FileItem>
                  {file.name}
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
                ref={quillRef}
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                placeholder="내용을 입력하세요"
              />
            </QuillWrapper>
          </FormGroup>

          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={() => navigate('/news/noticeboard')}
            >
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '게시글 등록'}
            </SubmitButton>
          </ButtonGroup>
        </FormSection>
      </ContentWrapper>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={handleAlertClose}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />

      <FormErrorModal
        isOpen={formErrorModal.isOpen}
        onClose={closeFormError}
        message={formErrorModal.message}
      />
    </Container>
  );
};

export default NoticeCreate;
