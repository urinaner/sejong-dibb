import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Download } from 'lucide-react';
import * as S from './CurriculumStyle';

interface Position {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
}

const Curriculum = () => {
  // 각 이미지별 독립적인 scale 상태 관리
  const [scaleCur, setScaleCur] = useState(0.8);
  const [scaleRoad, setScaleRoad] = useState(0.8);

  // 각 이미지의 위치 상태 관리
  const [positionCur, setPositionCur] = useState<Position>({ x: 0, y: 0 });
  const [positionRoad, setPositionRoad] = useState<Position>({ x: 0, y: 0 });

  // 드래그 상태 ref로 관리
  const dragStateCur = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  const dragStateRoad = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });

  // 이미지 컨테이너 ref
  const curContainerRef = useRef<HTMLDivElement>(null);
  const roadContainerRef = useRef<HTMLDivElement>(null);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 2;
  const SCALE_STEP = 0.2;

  // 드래그 시작 핸들러
  const handleMouseDown = (
    e: React.MouseEvent,
    dragState: React.RefObject<DragState>,
    containerRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (!containerRef.current || !dragState.current) return;

    dragState.current.isDragging = true;
    dragState.current.startX = e.pageX - containerRef.current.offsetLeft;
    dragState.current.startY = e.pageY - containerRef.current.offsetTop;
    dragState.current.scrollLeft = containerRef.current.scrollLeft;
    dragState.current.scrollTop = containerRef.current.scrollTop;

    containerRef.current.style.cursor = 'grabbing';
  };

  // 드래그 중 핸들러
  const handleMouseMove = (
    e: React.MouseEvent,
    dragState: React.RefObject<DragState>,
    containerRef: React.RefObject<HTMLDivElement>,
    setPosition: (pos: Position) => void,
  ) => {
    if (!dragState.current?.isDragging || !containerRef.current) return;

    e.preventDefault();

    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;

    const walkX = x - dragState.current.startX;
    const walkY = y - dragState.current.startY;

    setPosition({ x: walkX, y: walkY });
  };

  // 드래그 종료 핸들러
  const handleMouseUp = (
    dragState: React.RefObject<DragState>,
    containerRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (!dragState.current || !containerRef.current) return;

    dragState.current.isDragging = false;
    containerRef.current.style.cursor = 'grab';
  };

  // 교과과정 이미지 줌 컨트롤
  const handleZoomInCur = () => {
    setScaleCur((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  };

  const handleZoomOutCur = () => {
    setScaleCur((prev) => {
      const newScale = Math.max(prev - SCALE_STEP, MIN_SCALE);
      if (newScale === MIN_SCALE) {
        setPositionCur({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  // 로드맵 이미지 줌 컨트롤
  const handleZoomInRoad = () => {
    setScaleRoad((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
  };

  const handleZoomOutRoad = () => {
    setScaleRoad((prev) => {
      const newScale = Math.max(prev - SCALE_STEP, MIN_SCALE);
      if (newScale === MIN_SCALE) {
        setPositionRoad({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  // 마우스 이벤트 리스너 정리
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleMouseUp(dragStateCur, curContainerRef);
      handleMouseUp(dragStateRoad, roadContainerRef);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <S.Container>
      {/* 교과과정 섹션 */}
      <S.ImageWrapper>
        <S.ImageContainer
          key="curriculum"
          ref={curContainerRef}
          onMouseDown={(e) => handleMouseDown(e, dragStateCur, curContainerRef)}
          onMouseMove={(e) =>
            handleMouseMove(e, dragStateCur, curContainerRef, setPositionCur)
          }
          onMouseLeave={() => handleMouseUp(dragStateCur, curContainerRef)}
          style={{ cursor: scaleCur > MIN_SCALE ? 'grab' : 'default' }}
        >
          <S.CurriculumImage
            src="/curriculum-2025.jpeg"
            alt="2025학년도 전공 교과과정표 (생명과학대학 바이오융합공학전공)"
            style={{
              transform: `scale(${scaleCur}) translate(${positionCur.x}px, ${positionCur.y}px)`,
              transition: dragStateCur.current?.isDragging
                ? 'none'
                : 'transform 0.3s ease',
              pointerEvents: scaleCur > MIN_SCALE ? 'none' : 'auto',
            }}
            onError={(e) => {
              e.currentTarget.src = '/curriculum-2025.jpeg';
              e.currentTarget.onerror = null;
            }}
            draggable="false"
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
        <S.ImageContainer
          key="roadmap"
          ref={roadContainerRef}
          onMouseDown={(e) =>
            handleMouseDown(e, dragStateRoad, roadContainerRef)
          }
          onMouseMove={(e) =>
            handleMouseMove(e, dragStateRoad, roadContainerRef, setPositionRoad)
          }
          onMouseLeave={() => handleMouseUp(dragStateRoad, roadContainerRef)}
          style={{ cursor: scaleRoad > MIN_SCALE ? 'grab' : 'default' }}
        >
          <S.CurriculumImage
            src="/roadmap-2025.jpg"
            alt="2025학년도 바이오융합공학전공 로드맵"
            style={{
              transform: `scale(${scaleRoad}) translate(${positionRoad.x}px, ${positionRoad.y}px)`,
              transition: dragStateRoad.current?.isDragging
                ? 'none'
                : 'transform 0.3s ease',
              pointerEvents: scaleRoad > MIN_SCALE ? 'none' : 'auto',
            }}
            onError={(e) => {
              e.currentTarget.src = '/roadmap-2025.jpg';
              e.currentTarget.onerror = null;
            }}
            draggable="false"
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
