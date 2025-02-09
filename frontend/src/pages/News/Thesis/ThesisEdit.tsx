import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Modal, useModal } from '../../../components/Modal';
import ThesisForm from './ThesisForm';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import {
  useThesis,
  useUpdateThesis,
  useDeleteThesis,
} from '../../../hooks/queries/useThesis';
import type { ThesisItem } from '../../../hooks/queries/useThesis';

const ThesisEdit: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [thumbnailError, setThumbnailError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // React Query hooks
  const [formData, setFormData] = useState<ThesisItem | null>(null);
  const { data: thesis, isLoading } = useThesis(id, {
    enabled: !!id,
    staleTime: 30000, // 30초
  });

  // thesis 데이터가 로드되면 formData를 업데이트
  useEffect(() => {
    if (thesis) {
      setFormData(thesis);
      if (thesis.thesisImage) {
        setImagePreview(thesis.thesisImage);
      }
    }
  }, [thesis]);

  const updateMutation = useUpdateThesis();
  const deleteMutation = useDeleteThesis();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [],
  );

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        openModal(
          <>
            <Modal.Header>
              <AlertTriangle size={48} color="#E53E3E" />
              파일 크기 초과
            </Modal.Header>
            <Modal.Content>
              <p>이미지 크기는 5MB를 초과할 수 없습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Modal.CloseButton />
            </Modal.Footer>
          </>,
        );
        return;
      }

      if (!file.type.startsWith('image/')) {
        openModal(
          <>
            <Modal.Header>
              <AlertTriangle size={48} color="#E53E3E" />
              잘못된 파일 형식
            </Modal.Header>
            <Modal.Content>
              <p>이미지 파일만 업로드할 수 있습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Modal.CloseButton />
            </Modal.Footer>
          </>,
        );
        return;
      }

      setImageFile(file);
      setThumbnailError(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [openModal],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData) return;

    if (
      !formData.author.trim() ||
      !formData.journal.trim() ||
      !formData.content.trim()
    ) {
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            입력 오류
          </Modal.Header>
          <Modal.Content>
            <p>저자, 저널명, 내용은 필수 입력 항목입니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
      return;
    }

    const thesisReqDto: Omit<ThesisItem, 'id'> = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      journal: formData.journal.trim(),
      content: formData.content.trim(),
      link: formData.link,
      publicationDate: formData.publicationDate,
      thesisImage: formData.thesisImage,
      publicationCollection: formData.publicationCollection,
      publicationIssue: formData.publicationIssue,
      publicationPage: formData.publicationPage,
      issn: formData.issn,
      professorId: formData.professorId,
    };

    try {
      await updateMutation.mutateAsync(
        {
          id,
          thesisReqDto,
          imageFile,
        },
        {
          onSuccess: () => {
            openModal(
              <>
                <Modal.Header>
                  <CheckCircle size={48} color="#38A169" />
                  수정 완료
                </Modal.Header>
                <Modal.Content>
                  <p>논문이 성공적으로 수정되었습니다.</p>
                </Modal.Content>
                <Modal.Footer>
                  <Modal.CloseButton
                    onClick={() => navigate(`/news/thesis/${id}`)}
                  />
                </Modal.Footer>
              </>,
            );
          },
          onError: () => {
            openModal(
              <>
                <Modal.Header>
                  <AlertTriangle size={48} color="#E53E3E" />
                  수정 실패
                </Modal.Header>
                <Modal.Content>
                  <p>논문 수정 중 오류가 발생했습니다.</p>
                </Modal.Content>
                <Modal.Footer>
                  <Modal.CloseButton />
                </Modal.Footer>
              </>,
            );
          },
        },
      );
    } catch (error) {
      console.error('Error updating thesis:', error);
    }
  };

  const showDeleteConfirm = () => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          논문 삭제
        </Modal.Header>
        <Modal.Content>
          <p>정말 이 논문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
          <Modal.DeleteButton
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </Modal.DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id, {
        onSuccess: () => {
          openModal(
            <>
              <Modal.Header>
                <CheckCircle size={48} color="#38A169" />
                삭제 완료
              </Modal.Header>
              <Modal.Content>
                <p>논문이 성공적으로 삭제되었습니다.</p>
              </Modal.Content>
              <Modal.Footer>
                <Modal.CloseButton onClick={() => navigate('/news/thesis')} />
              </Modal.Footer>
            </>,
          );
        },
        onError: () => {
          openModal(
            <>
              <Modal.Header>
                <AlertTriangle size={48} color="#E53E3E" />
                삭제 실패
              </Modal.Header>
              <Modal.Content>
                <p>논문 삭제 중 오류가 발생했습니다.</p>
              </Modal.Content>
              <Modal.Footer>
                <Modal.CloseButton />
              </Modal.Footer>
            </>,
          );
        },
      });
    } catch (error) {
      console.error('Error deleting thesis:', error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner text="논문 정보를 불러오는 중입니다..." />
      </div>
    );
  }

  if (!thesis) return null;

  return (
    <ThesisForm
      formData={formData || thesis || null}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      isSubmitting={updateMutation.isPending}
      mode="edit"
      imagePreview={imagePreview}
      onImageChange={handleImageChange}
      onCancel={() => navigate(-1)}
      onDelete={showDeleteConfirm}
    />
  );
};

export default ThesisEdit;
