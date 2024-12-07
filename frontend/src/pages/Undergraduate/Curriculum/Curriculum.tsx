import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download } from 'lucide-react';
import * as S from './CurriculumStyle';

const Curriculum = () => {
  const [scale, setScale] = useState(0.8);
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 2;
  const SCALE_STEP = 0.2;

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE));
  };

  return (
    <S.Container>
      <S.ImageWrapper>
        <S.ImageContainer>
          <S.CurriculumImage
            src="/curriculum-2025.jpeg"
            alt="2025학년도 전공 교과과정표 (생명과학대학 바이오융합공학전공)"
            style={{
              transform: `scale(${scale})`,
              transition: 'transform 0.3s ease',
            }}
            onError={(e) => {
              e.currentTarget.src = '/curriculum-2025.jpeg';
              e.currentTarget.onerror = null;
            }}
          />

          <S.ZoomControls>
            <S.ZoomButton
              onClick={handleZoomOut}
              disabled={scale <= MIN_SCALE}
              aria-label="축소"
            >
              <ZoomOut />
            </S.ZoomButton>
            <S.ZoomButton
              onClick={handleZoomIn}
              disabled={scale >= MAX_SCALE}
              aria-label="확대"
            >
              <ZoomIn />
            </S.ZoomButton>
          </S.ZoomControls>
        </S.ImageContainer>

        <S.ImageCaption>
          2025학년도 전공 교과과정표 (바이오융합공학전공)
        </S.ImageCaption>
      </S.ImageWrapper>

      <S.DownloadSection>
        <S.DownloadLink
          href="/curriculum-2025.jpeg"
          download="curriculum-2025.jpeg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={18} />
          교과과정표 다운로드
        </S.DownloadLink>
      </S.DownloadSection>
    </S.Container>
  );
};

export default Curriculum;
