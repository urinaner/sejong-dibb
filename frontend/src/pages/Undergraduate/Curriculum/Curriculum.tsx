import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  lastTouch?: { x: number; y: number };
}

const Curriculum: React.FC = () => {
  const [scaleCur, setScaleCur] = useState(0.8);
  const [scaleRoad, setScaleRoad] = useState(0.8);
  const [positionCur, setPositionCur] = useState<Position>({ x: 0, y: 0 });
  const [positionRoad, setPositionRoad] = useState<Position>({ x: 0, y: 0 });

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

  const curContainerRef = useRef<HTMLDivElement>(null);
  const roadContainerRef = useRef<HTMLDivElement>(null);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 2;
  const SCALE_STEP = 0.2;

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent,
      dragState: React.RefObject<DragState>,
      containerRef: React.RefObject<HTMLDivElement>,
    ) => {
      if (!containerRef.current || !dragState.current) return;

      dragState.current.isDragging = true;
      dragState.current.startX = e.pageX - containerRef.current.offsetLeft;
      dragState.current.startY = e.pageY - containerRef.current.offsetTop;
      containerRef.current.style.cursor = 'grabbing';
    },
    [],
  );

  const handleMouseMove = useCallback(
    (
      e: React.MouseEvent,
      dragState: React.RefObject<DragState>,
      containerRef: React.RefObject<HTMLDivElement>,
      setPosition: React.Dispatch<React.SetStateAction<Position>>,
      currentScale: number,
    ) => {
      if (!dragState.current?.isDragging || !containerRef.current) return;

      e.preventDefault();

      const x = e.pageX - containerRef.current.offsetLeft;
      const y = e.pageY - containerRef.current.offsetTop;

      const walkX = (x - dragState.current.startX) / currentScale;
      const walkY = (y - dragState.current.startY) / currentScale;

      setPosition((prev: Position) => ({
        x: prev.x + walkX,
        y: prev.y + walkY,
      }));

      dragState.current.startX = x;
      dragState.current.startY = y;
    },
    [],
  );

  const handleMouseUp = useCallback(
    (
      dragState: React.RefObject<DragState>,
      containerRef: React.RefObject<HTMLDivElement>,
    ) => {
      if (!dragState.current || !containerRef.current) return;

      dragState.current.isDragging = false;
      containerRef.current.style.cursor = 'grab';
    },
    [],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, dragState: React.RefObject<DragState>) => {
      if (!dragState.current) return;

      const touch = e.touches[0];
      dragState.current.isDragging = true;
      dragState.current.lastTouch = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [],
  );

  const handleTouchMove = useCallback(
    (
      e: React.TouchEvent,
      dragState: React.RefObject<DragState>,
      setPosition: React.Dispatch<React.SetStateAction<Position>>,
      currentScale: number,
    ) => {
      if (!dragState.current?.isDragging || !dragState.current.lastTouch)
        return;

      e.preventDefault();

      const touch = e.touches[0];
      const walkX =
        (touch.clientX - dragState.current.lastTouch.x) / currentScale;
      const walkY =
        (touch.clientY - dragState.current.lastTouch.y) / currentScale;

      setPosition((prev: Position) => ({
        x: prev.x + walkX,
        y: prev.y + walkY,
      }));

      dragState.current.lastTouch = {
        x: touch.clientX,
        y: touch.clientY,
      };
    },
    [],
  );

  const handleTouchEnd = useCallback(
    (dragState: React.RefObject<DragState>) => {
      if (!dragState.current) return;
      dragState.current.isDragging = false;
      dragState.current.lastTouch = undefined;
    },
    [],
  );

  const handleZoom = useCallback(
    (
      type: 'in' | 'out',
      currentScale: number,
      setScale: React.Dispatch<React.SetStateAction<number>>,
      setPosition: React.Dispatch<React.SetStateAction<Position>>,
    ) => {
      if (type === 'in') {
        setScale((prev) => Math.min(prev + SCALE_STEP, MAX_SCALE));
      } else {
        setScale((prev) => {
          const newScale = Math.max(prev - SCALE_STEP, MIN_SCALE);
          if (newScale === MIN_SCALE) {
            setPosition({ x: 0, y: 0 });
          }
          return newScale;
        });
      }
    },
    [MIN_SCALE, MAX_SCALE, SCALE_STEP],
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (curContainerRef.current) {
        curContainerRef.current.style.cursor = 'grab';
        dragStateCur.current.isDragging = false;
      }
      if (roadContainerRef.current) {
        roadContainerRef.current.style.cursor = 'grab';
        dragStateRoad.current.isDragging = false;
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', () => {
      handleTouchEnd(dragStateCur);
      handleTouchEnd(dragStateRoad);
    });

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', () => {
        handleTouchEnd(dragStateCur);
        handleTouchEnd(dragStateRoad);
      });
    };
  }, []);

  const renderImage = useCallback(
    (
      type: 'curriculum' | 'roadmap',
      {
        src,
        alt,
        scale,
        position,
        dragState,
        containerRef,
        setPosition,
      }: {
        src: string;
        alt: string;
        scale: number;
        position: Position;
        dragState: React.RefObject<DragState>;
        containerRef: React.RefObject<HTMLDivElement>;
        setPosition: React.Dispatch<React.SetStateAction<Position>>;
      },
    ) => (
      <S.ImageContainer
        key={type}
        ref={containerRef}
        onMouseDown={(e) => handleMouseDown(e, dragState, containerRef)}
        onMouseMove={(e) =>
          handleMouseMove(e, dragState, containerRef, setPosition, scale)
        }
        onMouseLeave={() => handleMouseUp(dragState, containerRef)}
        onTouchStart={(e) => handleTouchStart(e, dragState)}
        onTouchMove={(e) => handleTouchMove(e, dragState, setPosition, scale)}
        onTouchEnd={() => handleTouchEnd(dragState)}
        style={{ cursor: scale > MIN_SCALE ? 'grab' : 'default' }}
      >
        <S.CurriculumImage
          src={src}
          alt={alt}
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: dragState.current?.isDragging
              ? 'none'
              : 'transform 0.3s ease',
            pointerEvents: scale > MIN_SCALE ? 'none' : 'auto',
          }}
          onError={(e) => {
            e.currentTarget.src = src;
            e.currentTarget.onerror = null;
          }}
          draggable="false"
        />

        <S.ZoomControls>
          <S.ZoomButton
            onClick={() =>
              handleZoom(
                'out',
                scale,
                type === 'curriculum' ? setScaleCur : setScaleRoad,
                setPosition,
              )
            }
            disabled={scale <= MIN_SCALE}
            aria-label={`${type} 축소`}
          >
            <ZoomOut />
          </S.ZoomButton>
          <S.ZoomButton
            onClick={() =>
              handleZoom(
                'in',
                scale,
                type === 'curriculum' ? setScaleCur : setScaleRoad,
                setPosition,
              )
            }
            disabled={scale >= MAX_SCALE}
            aria-label={`${type} 확대`}
          >
            <ZoomIn />
          </S.ZoomButton>
        </S.ZoomControls>
      </S.ImageContainer>
    ),
    [
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    ],
  );

  return (
    <S.Container>
      <S.ImageWrapper>
        {renderImage('curriculum', {
          src: '/curriculum-2025.jpeg',
          alt: '2025학년도 전공 교과과정표 (바이오융합공학전공)',
          scale: scaleCur,
          position: positionCur,
          dragState: dragStateCur,
          containerRef: curContainerRef,
          setPosition: setPositionCur,
        })}
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

      <S.ImageWrapper>
        {renderImage('roadmap', {
          src: '/roadmap-2025.jpg',
          alt: '2025학년도 바이오융합공학전공 로드맵',
          scale: scaleRoad,
          position: positionRoad,
          dragState: dragStateRoad,
          containerRef: roadContainerRef,
          setPosition: setPositionRoad,
        })}
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
