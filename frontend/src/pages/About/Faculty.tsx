// Faculty.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import * as S from './FacultyStyle';
import { apiEndpoints } from '../../config/apiConfig';

interface Professor {
  id: number;
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
}

interface ApiResponse {
  message: string;
  page: number;
  totalPage: number;
  data: Professor[];
}

const ITEMS_PER_PAGE = 10;
const DEFAULT_PROFILE_IMAGE = 'https://via.placeholder.com/200'; // 기본 프로필 이미지 경로

const Faculty = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfessors = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(
        apiEndpoints.professor.listWithPage(page, ITEMS_PER_PAGE),
      );

      if (response.data?.data) {
        setProfessors(response.data.data);
        setTotalPages(response.data.totalPage);
      } else {
        throw new Error('Invalid data format received');
      }
    } catch (err) {
      let errorMessage = '교수진 데이터를 불러오는데 실패했습니다.';
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        errorMessage = '데이터가 존재하지 않습니다.';
      }
      setError(errorMessage);
      console.error('Error fetching professors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessors(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
  };

  if (loading) {
    return (
      <S.LoadingContainer>데이터를 불러오는 중입니다...</S.LoadingContainer>
    );
  }

  if (error) {
    return <S.ErrorContainer>{error}</S.ErrorContainer>;
  }

  return (
    <S.Container>
      <S.Title>교수진 소개</S.Title>

      {professors.length > 0 ? (
        <>
          <S.ProfessorList>
            {professors.map((professor) => (
              <S.ProfessorCard key={professor.id}>
                <S.ImageSection>
                  <S.ProfessorImage
                    src={DEFAULT_PROFILE_IMAGE}
                    alt={`${professor.name} 교수`}
                    onError={handleImageError}
                    loading="lazy"
                  />
                </S.ImageSection>

                <S.InfoSection>
                  <S.MainInfo>
                    <S.ProfessorName>{professor.name}</S.ProfessorName>
                    <S.Position>{professor.position}</S.Position>
                    <S.Major>{professor.major}</S.Major>
                  </S.MainInfo>

                  <S.ContactInfo>
                    <S.InfoTitle>연락처</S.InfoTitle>
                    <S.InfoList>
                      {professor.phoneN && (
                        <S.InfoItem>
                          <Phone />
                          <span>전화번호: {professor.phoneN}</span>
                        </S.InfoItem>
                      )}

                      {professor.email && (
                        <S.InfoItem>
                          <Mail />
                          <span>이메일: </span>
                          <S.Link href={`mailto:${professor.email}`}>
                            {professor.email}
                          </S.Link>
                        </S.InfoItem>
                      )}

                      {professor.homepage && (
                        <S.InfoItem>
                          <Globe />
                          <span>홈페이지: </span>
                          <S.Link
                            href={professor.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {professor.homepage}
                          </S.Link>
                        </S.InfoItem>
                      )}

                      {professor.lab && (
                        <S.InfoItem>
                          <MapPin />
                          <span>연구실: {professor.lab}</span>
                        </S.InfoItem>
                      )}
                    </S.InfoList>
                  </S.ContactInfo>
                </S.InfoSection>
              </S.ProfessorCard>
            ))}
          </S.ProfessorList>

          <S.PaginationWrapper>
            <S.PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              aria-label="이전 페이지"
            >
              <ChevronLeft />
            </S.PaginationButton>

            <S.PageNumber>
              {currentPage + 1} / {totalPages}
            </S.PageNumber>

            <S.PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              aria-label="다음 페이지"
            >
              <ChevronRight />
            </S.PaginationButton>
          </S.PaginationWrapper>
        </>
      ) : (
        <S.EmptyStateContainer>
          등록된 교수진 정보가 없습니다.
        </S.EmptyStateContainer>
      )}
    </S.Container>
  );
};

export default Faculty;
