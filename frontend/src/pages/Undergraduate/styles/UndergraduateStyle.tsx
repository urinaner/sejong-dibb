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
  width: 60%;
  height: 30%;
  white-space: nowrap;
  border-radius: 24px;
  font-family: 'Noto Sans KR', serif;
  font-weight: 600;
  font-size: 22px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
`;

export const HyperlinksContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Hyperlinks = styled.a`
  display: flex;
  justify-content: center;
  width: 120px;
  background: none;
  border: none;
`;
