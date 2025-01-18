import React, { useState, useRef, useMemo, useCallback } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
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
  QuillWrapper,
  ButtonGroup,
  CancelButton,
  SubmitButton,
  FileInputLabel,
  FileInput,
  FileList,
  FileItem,
} from './NewsCreateStyle';
import { useCreateNews } from '../../../hooks/queries/useNews';
import { NewsReqDto } from '../../../config/apiConfig';

interface NewsFormData {
  title: string;
  content: string;
  link?: string;
  createDate: string;
  newsImage?: File;
}

const NewsCreate: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const quillRef = useRef<ReactQuill>(null);
  const { openModal } = useModal();

  const createNewsMutation = useCreateNews();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['link'],
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
    ],
    [],
  );

  const handleChange = useCallback((value: string) => {
    setContent(value);
  }, []);

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

  const showSuccessModal = (newsId: number) => {
    openModal(
      <>
        <Modal.Header>
          <CheckCircle size={48} color="#38A169" />
          등록 완료
        </Modal.Header>
        <Modal.Content>
          <p>뉴스가 성공적으로 등록되었습니다. (ID: {newsId})</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton onClick={() => navigate('/news')} />
        </Modal.Footer>
      </>,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      showErrorModal('입력 형식 오류', '제목과 내용은 필수 입력값입니다.');
      return;
    }

    try {
      // HTML 태그 제거
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const cleanContent = tempDiv.textContent || tempDiv.innerText || '';

      // newsReqDto 객체 생성
      const newsReqDto: NewsReqDto = {
        title: title.trim(),
        content: cleanContent.trim(),
        link: link.trim() || '', // 빈 문자열을 기본값으로 사용
        image: '', // 이미지 URL은 서버에서 생성되므로 빈 문자열로 초기화
        createDate: new Date().toISOString().split('T')[0],
      };

      // mutateAsync에 올바른 형식으로 데이터 전달
      const result = await createNewsMutation.mutateAsync(
        {
          newsReqDto,
          imageFile: imageFile || undefined,
        },
        {
          onSuccess: (newsId) => {
            showSuccessModal(newsId);
          },
          onError: (error: any) => {
            if (error.response?.status === 400) {
              showErrorModal('입력 오류', error.response.data.message);
            } else {
              showErrorModal('등록 실패', '뉴스 등록 중 오류가 발생했습니다');
            }
          },
        },
      );
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showErrorModal(
        '파일 크기 초과',
        '이미지 크기는 5MB를 초과할 수 없습니다.',
      );
      return;
    }

    if (!file.type.startsWith('image/')) {
      showErrorModal('잘못된 파일 형식', '이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setImageFile(file);
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <h1>뉴스 작성</h1>
        </Header>

        <FormSection onSubmit={handleSubmit}>
          <FormGroup>
            <Label>제목*</Label>
            <Input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>링크</Label>
            <Input
              type="url"
              placeholder="관련 링크를 입력하세요 (선택사항)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>대표 이미지</Label>
            <FileInputLabel>
              🖼️ 이미지 선택
              <FileInput
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
            </FileInputLabel>
            {imageFile && (
              <FileList>
                <FileItem>
                  {imageFile.name}
                  <button type="button" onClick={() => setImageFile(null)}>
                    ×
                  </button>
                </FileItem>
              </FileList>
            )}
          </FormGroup>

          <FormGroup>
            <Label>내용*</Label>
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
            <CancelButton type="button" onClick={() => navigate('/news')}>
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={createNewsMutation.isPending}>
              {createNewsMutation.isPending ? '등록 중...' : '뉴스 등록'}
            </SubmitButton>
          </ButtonGroup>
        </FormSection>
      </ContentWrapper>
    </Container>
  );
};

export default NewsCreate;
