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

  const handleChange = useCallback((content: string) => {
    setContent(content);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      alert('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    if (!auth.user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      // const token = localStorage.getItem('token');
      // if (!token) {
      //   throw new Error('인증 토큰이 없습니다.');
      // }

      const today = new Date();
      const createDate = today.toISOString().split('T')[0];

      /*
      let fileUrl = '';
      if (file) {
        const fileFormData = new FormData();
        fileFormData.append('file', file);

        try {
          // 파일 업로드 API 엔드포인트로 수정 필요
          const fileResponse = await axios.post('/api/upload', fileFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: token,
            },
          });
          fileUrl = fileResponse.data.fileUrl; // 서버에서 반환하는 파일 URL
        } catch (error) {
          console.error('File upload failed:', error);
          throw new Error('파일 업로드에 실패했습니다.');
        }
      }
      */

      const postData = {
        title: title.trim(),
        content: content.trim(),
        writer: auth.user,
        file: 'file.pdf', // 업로드된 파일의 URL
        createDate: createDate,
        category: category,
        departmentId: 1, // 기본값으로 1 설정
      };
      // 게시글 생성 요청
      const response = await axios.post(apiEndpoints.board.create, postData, {
        // headers: {
        //   'Content-Type': 'application/json',
        //   Authorization: token,
        // },
      });

      if (response.status === 200 || response.status === 201) {
        alert('게시글이 성공적으로 등록되었습니다.');
        navigate('/news/noticeboard');
      } else {
        throw new Error('게시글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error posting article:', error);
      if (error instanceof Error && error.message === '인증 토큰이 없습니다.') {
        alert('로그인이 필요합니다.');
      } else if (
        error instanceof Error &&
        error.message === '파일 업로드에 실패했습니다.'
      ) {
        alert('파일 업로드에 실패했습니다.');
      } else {
        alert('게시글 작성 중 오류가 발생했습니다.');
      }
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
    </Container>
  );
};

export default NoticeCreate;
