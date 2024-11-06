import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import {
  Container,
  Header,
  FormContainer,
  InputGroup,
  TitleInput,
  CategorySelect,
  EditorContainer,
  ButtonGroup,
  Button,
  ErrorMessage,
} from './NoticeCreateStyle';
import { NoticeForm } from '../../../types/board';

const EDITOR_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'color',
  'background',
  'align',
  'link',
  'image',
];

const EDITOR_MODULES = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  },
};

const NoticeCreate: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<NoticeForm>({
    title: '',
    content: '',
    category: '학부',
  });
  const [errors, setErrors] = useState<Partial<NoticeForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editorKey, setEditorKey] = useState<number>(0); // 에디터 키 상태 추가
  // @ts-ignore
  const quillRef = useRef<ReactQuill>(null);

  // 이미지 업로드 핸들러
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await axios.post('/api/upload-image', formData);
          const imageUrl = response.data.url;
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          if (editor && range) {
            editor.insertEmbed(range.index, 'image', imageUrl);
          }
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          alert('이미지 업로드에 실패했습니다.');
        }
      }
    };
  }, []);

  // 입력값 변경 핸들러
  const handleChange = useCallback(
    (name: keyof NoticeForm, value: string) => {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors],
  );

  // 카테고리 변경 핸들러
  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newCategory = e.target.value;
      handleChange('category', newCategory);
      setEditorKey((prev) => prev + 1); // 에디터 키 업데이트
    },
    [handleChange],
  );

  // 유효성 검사
  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<NoticeForm> = {};

    if (!form.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
    }

    if (!form.content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  // Quill 에디터 설정
  const modules = {
    ...EDITOR_MODULES,
    toolbar: {
      ...EDITOR_MODULES.toolbar,
      handlers: {
        image: imageHandler,
      },
    },
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(apiEndpoints.board.create, {
        ...form,
        category: form.category,
      });

      alert('공지사항이 등록되었습니다.');
      navigate('/news/noticeboard');
    } catch (error: any) {
      console.error('공지사항 등록 실패:', error);
      alert(error.response?.data?.message || '공지사항 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <h1>공지사항 작성</h1>
      </Header>

      <FormContainer>
        <InputGroup>
          <label htmlFor="category">카테고리</label>
          <CategorySelect
            id="category"
            value={form.category}
            onChange={handleCategoryChange}
          >
            <option value="학부">학부</option>
            <option value="대학원">대학원</option>
          </CategorySelect>
        </InputGroup>

        <InputGroup>
          <label htmlFor="title">제목</label>
          <TitleInput
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="제목을 입력하세요"
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <label>내용</label>
          <EditorContainer>
            <ReactQuill
              key={editorKey} // 고유 키 추가
              ref={quillRef}
              value={form.content}
              onChange={(value: string) => handleChange('content', value)}
              modules={modules}
              formats={EDITOR_FORMATS}
              placeholder="내용을 입력하세요"
              preserveWhitespace={true} // 공백 유지 옵션 추가
              theme="snow"
            />
          </EditorContainer>
          {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
        </InputGroup>

        <ButtonGroup>
          <Button onClick={() => navigate('/news/noticeboard')}>취소</Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '등록 중...' : '등록'}
          </Button>
        </ButtonGroup>
      </FormContainer>
    </Container>
  );
};

export default NoticeCreate;
