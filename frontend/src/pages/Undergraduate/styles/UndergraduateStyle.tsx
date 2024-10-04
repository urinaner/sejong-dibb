import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  align-items: center;
  justify-content: center;
`;

export const Information = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 80%;
  height: 30%;
  border-radius: 24px;
  font-family: 'Noto Sans KR';
  font-weight: 600;
  font-size: 22px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
`;

export const HyperlinksContainer = styled.div`
  display: flex;
`;

export const Hyperlinks = styled.a`
  background: none;
  border: none;
  width: 120px;
`;
