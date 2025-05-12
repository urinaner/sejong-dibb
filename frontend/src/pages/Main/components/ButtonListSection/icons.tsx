import React from 'react';

// 아이콘 타입 정의
export type IconType =
  | 'university'
  | 'scholarship'
  | 'portal'
  | 'student'
  | 'seminar';

// SVG 아이콘 경로 매핑
const iconPaths: Record<IconType, string> = {
  university: '/icons/세종대학교.svg',
  scholarship: '/icons/장학.svg',
  portal: '/icons/포털시스템.svg',
  student: '/icons/학생회.svg',
  seminar: '/icons/세미나.svg',
};

// 커스텀 아이콘 컴포넌트 props
interface CustomIconProps {
  src: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  fontSize?: 'inherit' | 'small' | 'medium' | 'large';
}

// SVG 아이콘 컴포넌트
const SvgIconComponent: React.FC<CustomIconProps> = ({
  src,
  size,
  color,
  className,
  style,
  fontSize = 'medium',
}) => {
  // fontSize에 따라 크기 결정
  let iconSize: number | string = size || '1em';
  if (!size && fontSize) {
    switch (fontSize) {
      case 'small':
        iconSize = '1.25rem';
        break;
      case 'medium':
        iconSize = '2.5rem'; // 더 크게 조정
        break;
      case 'large':
        iconSize = '4rem'; // 더 크게 조정
        break;
      case 'inherit':
        iconSize = '1em';
        break;
      default:
        iconSize = '2.5rem';
    }
  }

  return (
    <img
      src={src}
      alt=""
      className={className}
      width={iconSize}
      height={iconSize}
      style={{
        filter: `${color ? `invert(1) sepia(1) saturate(5) hue-rotate(${getHueRotate(color)})` : 'none'}`,
        ...style,
      }}
    />
  );
};

// 색상 이름에 따른 hue-rotate 값 계산 (간단한 구현)
const getHueRotate = (color: string): string => {
  switch (color.toLowerCase()) {
    case 'red':
      return '0deg';
    case 'blue':
      return '240deg';
    case 'green':
      return '120deg';
    case 'inherit':
    case 'currentcolor':
      return '0deg';
    default:
      return '0deg';
  }
};

// 아이콘 팩토리 함수
const createIconComponent = (iconType: IconType) => {
  const IconComponent: React.FC<Omit<CustomIconProps, 'src'>> = (props) => (
    <SvgIconComponent src={iconPaths[iconType]} {...props} />
  );

  // displayName 설정
  IconComponent.displayName = `Icon_${iconType}`;

  return IconComponent;
};

// 각 아이콘 타입에 대한 컴포넌트 생성
const iconComponents = {
  university: createIconComponent('university'),
  scholarship: createIconComponent('scholarship'),
  portal: createIconComponent('portal'),
  student: createIconComponent('student'),
  seminar: createIconComponent('seminar'),
};

/**
 * 아이콘 이름으로부터 실제 아이콘 컴포넌트를 반환하는 함수
 * @param iconName 아이콘 이름
 * @returns 해당하는 아이콘 컴포넌트
 */
export const getIcon = (iconName: IconType) => {
  return iconComponents[iconName] || iconComponents.university;
};

export default iconComponents;
