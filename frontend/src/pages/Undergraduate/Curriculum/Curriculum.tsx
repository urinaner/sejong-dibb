import React from 'react';
import * as S from './CurriculumStyle';

const Curriculum: React.FC = () => {
  return (
    <S.Container>
      <S.ImageContainer>
        <S.CurriculumImage
          src="/curriculum-2025.jpeg"
          alt="2025학년도 전공 교과과정표 (생명과학대학 바이오융합공학전공)"
          onError={(e) => {
            e.currentTarget.src = '/curriculum-2025.jpeg';
            e.currentTarget.onerror = null;
          }}
        />
        <S.Caption>
          2025학년도 전공 교과과정표 (생명과학대학 바이오융합공학전공)
        </S.Caption>
      </S.ImageContainer>
    </S.Container>
  );
};

export default Curriculum;
