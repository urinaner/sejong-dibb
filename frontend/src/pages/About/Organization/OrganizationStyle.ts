import styled from 'styled-components';
import { Wrapper, Content, Title, InfoCard } from '../AboutStyle';

export const OrgWrapper = styled(Wrapper)`
  background-color: #fff;
  padding: 20px;
`;

export const OrgContent = styled(Content)`
  background-color: #fff;
  max-width: 800px;
  margin: 0 auto;
`;

export const OrgTitle = styled(Title)`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

export const OrgCard = styled(InfoCard)`
  padding: 30px;
  margin: 0 auto 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  dl {
    dt {
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
      font-size: 16px;
    }

    dd {
      color: #666;
      margin-bottom: 24px;
      margin-left: 0;
      font-size: 15px;
      line-height: 1.6;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .map-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    border: 2px dashed #ddd;
    color: #666;
  }
`;
