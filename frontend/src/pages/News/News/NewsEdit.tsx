import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
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
import { apiEndpoints } from '../../../config/apiConfig';
import axios from 'axios';

interface NewsData {
  id: number;
  title: string;
  content: string;
  view: number;
  createDate: string;
  link: string;
  image: string;
}

interface NewsReqDto {
  title: string;
  content: string;
  createDate: string;
  link?: string;
  image?: string;
}

const NewsEdit: React.FC = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const quillRef = useRef<ReactQuill>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        if (!newsId) return;

        const response = await fetch(apiEndpoints.news.get(newsId));
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('뉴스를 찾을 수 없습니다.');
          }
          throw new Error('뉴스를 불러오는데 실패했습니다.');
        }

        const data: NewsData = await response.json();
        setTitle(data.title);
        setContent(data.content);
        setLink(data.link || '');
        setCurrentImage(data.image || '');
      } catch (error) {
        console.error('Error fetching news:', error);
        showErrorModal(
          '데이터 로딩 실패',
          '뉴스 데이터를 불러오는데 실패했습니다.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, [newsId]);

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

  const showSuccessModal = () => {
    openModal(
      <>
        <Modal.Header>
          <CheckCircle size={48} color="#38A169" />
          수정 완료
        </Modal.Header>
        <Modal.Content>
          <p>뉴스가 성공적으로 수정되었습니다.</p>
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

    if (!newsId) {
      showErrorModal('오류', '뉴스 ID가 없습니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      // HTML 태그 제거
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const cleanContent = tempDiv.textContent || tempDiv.innerText || '';

      const newsReqDto: NewsReqDto = {
        title: title.trim(),
        content: cleanContent.trim(),
        createDate: new Date().toISOString().split('T')[0],
      };

      if (link.trim()) {
        newsReqDto.link = link.trim();
      }

      if (currentImage) {
        newsReqDto.image = currentImage;
      }

      formData.append(
        'newsReqDto',
        new Blob([JSON.stringify(newsReqDto)], {
          type: 'application/json',
        }),
      );

      if (imageFile) {
        formData.append('newsImage', imageFile);
      }

      const response = await axios.post(
        apiEndpoints.news.update.url(newsId),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        showSuccessModal();
      }
    } catch (error: any) {
      console.error('Error updating news:', error);
      if (error.response?.status === 404) {
        showErrorModal('뉴스 없음', '해당 뉴스를 찾을 수 없습니다.');
      } else if (error.response?.status === 400) {
        showErrorModal('입력 오류', error.response.data.message);
      } else {
        showErrorModal('수정 실패', '뉴스 수정 중 오류가 발생했습니다');
      }
    } finally {
      setIsSubmitting(false);
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

  if (isLoading) {
    return (
      <Container>
        <div>로딩 중...</div>
      </Container>
    );
  }

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <h1>뉴스 수정</h1>
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
            {currentImage && (
              <div>
                <img
                  src={`https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/${currentImage}`}
                  alt="현재 이미지"
                  style={{ maxWidth: '200px', marginBottom: '10px' }}
                />
              </div>
            )}
            <FileInputLabel>
              🖼️ 새 이미지 선택
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
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '수정 중...' : '뉴스 수정'}
            </SubmitButton>
          </ButtonGroup>
        </FormSection>
      </ContentWrapper>
    </Container>
  );
};

export default NewsEdit;
