import React, { useState, useRef } from 'react';
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

interface PostFormData {
  title: string;
  content: string;
  category: string;
  attachments?: File[];
}

const NoticeCreate: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('announcement'); // 기본값 설정
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill>(null);

  const categories = [
    { value: 'announcement', label: '공지사항' },
    { value: 'event', label: '이벤트' },
    { value: 'news', label: '뉴스' },
    { value: 'update', label: '업데이트' },
  ];

  const modules = {
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
                // 이미지 업로드 로직을 여기에 구현
                // const formData = new FormData();
                // formData.append('image', file);
                // const response = await uploadImage(formData);
                // const url = response.data.url;
                // const editor = quillRef.current?.getEditor();
                // const range = editor?.getSelection();
                // editor?.insertEmbed(range?.index || 0, 'image', url);
              } catch (error) {
                console.error('Image upload failed:', error);
              }
            }
          };
        },
      },
    },
  };

  const formats = [
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
  ];

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any,
  ) => {
    setContent(content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      alert('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      const postData: PostFormData = {
        title: title.trim(),
        content: content.trim(),
        category: category,
      };

      const response = await fetch(apiEndpoints.board.create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('게시글 작성에 실패했습니다.');
      }

      const result = await response.json();
      alert('게시글이 성공적으로 등록되었습니다.');

      // Reset form
      setTitle('');
      setContent('');
      setCategory('announcement');
    } catch (error) {
      console.error('Error posting article:', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
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
