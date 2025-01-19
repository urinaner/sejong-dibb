import styled from 'styled-components';
import { Paper } from '../../MainStyle';

export const PaperCardWrapper = styled(Paper)`
  // 기존 Paper 스타일을 확장하여 필요한 스타일 추가
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;
