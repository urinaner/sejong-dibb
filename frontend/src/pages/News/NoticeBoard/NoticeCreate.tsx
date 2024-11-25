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
import { Modal } from '../../../components/Modal';
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
import { apiEndpoints } from '../../../config/apiConfig';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import Button from '../../../common/Button/Button';

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

  // 모달 상태 관리
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', content: '' });
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

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
      setModalMessage({
        title: '입력 오류',
        content: '제목, 내용, 카테고리를 모두 입력해주세요.',
      });
      setIsErrorModalOpen(true);
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
        setModalType('success');
        setModalMessage({
          title: '등록 완료',
          content: '게시글이 성공적으로 등록되었습니다.',
        });
        setIsResultModalOpen(true);
      }
    } catch (error) {
      console.error('Error posting article:', error);
      setModalType('error');
      setModalMessage({
        title: '등록 실패',
        content: '게시글 등록 중 오류가 발생했습니다.',
      });
      setIsResultModalOpen(true);
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

  const handleResultModalClose = () => {
    setIsResultModalOpen(false);
    if (modalType === 'success') {
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
          {/* 기존 폼 내용 유지 */}
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

          {/* 나머지 폼 필드들... */}

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

      {/* 에러 모달 */}
      <Modal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      >
        <Modal.Header>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={24} />
            {modalMessage.title}
          </h2>
        </Modal.Header>
        <Modal.Content>
          <p className="text-gray-600">{modalMessage.content}</p>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsErrorModalOpen(false)}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 결과 모달 */}
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
    </Container>
  );
};

export default NoticeCreate;
