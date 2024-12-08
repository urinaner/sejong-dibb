import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download } from 'lucide-react';
import * as S from './CurriculumStyle';

const Curriculum = () => {
  // 각 이미지별 독립적인 scale 상태 관리
  const [scaleCur, setScaleCur] = useState(0.8);
  const [scaleRoad, setScaleRoad] = useState(0.8);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 2;
  const SCALE_STEP = 0.2;

  // 교과과정 이미지 줌 컨트롤
  const handleZoomInCur = () => {
    setScaleCur((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  };

  const handleZoomOutCur = () => {
    setScaleCur((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE));
  };

  // 로드맵 이미지 줌 컨트롤
  const handleZoomInRoad = () => {
    setScaleRoad((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  };

  const handleZoomOutRoad = () => {
    setScaleRoad((prev) => Math.max(prev - SCALE_STEP, MIN_SCALE));
  };

  return (
    <S.Container>
      {/* 교과과정 섹션 */}
      <S.ImageWrapper>
        <S.ImageContainer key="curriculum">
          <S.CurriculumImage
            src="/curriculum-2025.jpeg"
            alt="2025학년도 전공 교과과정표 (생명과학대학 바이오융합공학전공)"
            style={{
              transform: `scale(${scaleCur})`,
              transition: 'transform 0.3s ease',
            }}
            onError={(e) => {
              e.currentTarget.src = '/curriculum-2025.jpeg';
              e.currentTarget.onerror = null;
            }}
          />

          <S.ZoomControls key="curriculum-zoom">
            <S.ZoomButton
              onClick={handleZoomOutCur}
              disabled={scaleCur <= MIN_SCALE}
              aria-label="교과과정 축소"
            >
              <ZoomOut />
            </S.ZoomButton>
            <S.ZoomButton
              onClick={handleZoomInCur}
              disabled={scaleCur >= MAX_SCALE}
              aria-label="교과과정 확대"
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
          download="세종대학교_바이오융합공학전공_교과과정표_2025.jpeg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={18} />
          교과과정표 다운로드
        </S.DownloadLink>
      </S.DownloadSection>

      {/* 로드맵 섹션 */}
      <S.ImageWrapper>
        <S.ImageContainer key="roadmap">
          <S.CurriculumImage
            src="/roadmap-2025.jpg"
            alt="2025학년도 바이오융합공학전공 로드맵"
            style={{
              transform: `scale(${scaleRoad})`,
              transition: 'transform 0.3s ease',
            }}
            onError={(e) => {
              e.currentTarget.src = '/roadmap-2025.jpg';
              e.currentTarget.onerror = null;
            }}
          />

          <S.ZoomControls key="roadmap-zoom">
            <S.ZoomButton
              onClick={handleZoomOutRoad}
              disabled={scaleRoad <= MIN_SCALE}
              aria-label="로드맵 축소"
            >
              <ZoomOut />
            </S.ZoomButton>
            <S.ZoomButton
              onClick={handleZoomInRoad}
              disabled={scaleRoad >= MAX_SCALE}
              aria-label="로드맵 확대"
            >
              <ZoomIn />
            </S.ZoomButton>
          </S.ZoomControls>
        </S.ImageContainer>

        <S.ImageCaption>2025학년도 바이오융합공학전공 로드맵</S.ImageCaption>
      </S.ImageWrapper>

      <S.DownloadSection>
        <S.DownloadLink
          href="/roadmap-2025.jpeg"
          download="세종대학교_바이오융합공학전공_로드맵_2025.jpeg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download size={18} />
          로드맵 다운로드
        </S.DownloadLink>
      </S.DownloadSection>
    </S.Container>
  );
};

export default Curriculum;
