import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  PageWrapper,
  ContentContainer,
  HeaderSection,
  BackButton,
  FormSection,
  FormGroup,
  Label,
  TitleInput,
  CategorySelect,
  QuillWrapper,
  ButtonGroup,
  CancelButton,
  SubmitButton,
} from './NoticeCreateStyle';
import { apiEndpoints } from '../../../config/apiConfig';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

interface PostFormData {
  title: string;
  content: string;
  viewCount: number;
  writer: string;
  file: string;
  createDate: string;
  category: string;
  departmentId: number;
}

const NoticeCreate: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('announcement');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill>(null);
  const auth = useContext(AuthContext); // AuthContext 사용
  const [file, setFile] = useState<string>('');

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
        handlers: {
          image: function () {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (file) {
                try {
                  // 이미지 업로드 로직
                } catch (error) {
                  console.error('Image upload failed:', error);
                }
              }
            };
          },
        },
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

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      const currentDate = new Date().toISOString();

      const postData: PostFormData = {
        title: title.trim(),
        content: content.trim(),
        viewCount: 0,
        writer: auth.user,
        file: file,
        createDate: currentDate,
        category: category,
        departmentId: 0,
      };

      console.log(postData);

      const response = await axios.post(apiEndpoints.board.create, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // JWT 토큰 추가
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('게시글 작성에 실패했습니다.');
      }

      alert('게시글이 성공적으로 등록되었습니다.');

      setTitle('');
      setContent('');
      setCategory('announcement');
      setFile('');
    } catch (error) {
      console.error('Error posting article:', error);
      if (error instanceof Error && error.message === '인증 토큰이 없습니다.') {
        alert('로그인이 필요합니다.');
      } else {
        alert('게시글 작성 중 오류가 발생했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 파일 업로드 처리 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일을 base64로 변환하거나 필요한 처리를 수행
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageWrapper>
      <ContentContainer>
        <HeaderSection>
          <h1>게시글 작성</h1>
          <BackButton>← 목록으로</BackButton>
        </HeaderSection>

        <form onSubmit={handleSubmit}>
          <FormSection>
            <FormGroup>
              <Label>카테고리</Label>
              <CategorySelect
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </CategorySelect>
            </FormGroup>

            <FormGroup>
              <Label>제목</Label>
              <TitleInput
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>첨부파일</Label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
              />
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
          </FormSection>

          <ButtonGroup>
            <CancelButton type="button">취소</CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '게시글 등록'}
            </SubmitButton>
          </ButtonGroup>
        </form>
      </ContentContainer>
    </PageWrapper>
  );
};

export default NoticeCreate;
