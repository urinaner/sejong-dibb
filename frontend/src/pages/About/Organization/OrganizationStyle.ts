import styled from 'styled-components';
import { Wrapper, Content, Title, InfoCard } from '../AboutStyle';

export const OrgWrapper = styled(Wrapper)`
  background-color: #fff;
  padding: 40px 20px;
`;

export const OrgContent = styled(Content)`
  background-color: #fff;
  max-width: 800px;
  margin: 0 auto;
`;

export const OrgTitle = styled(Title)`
  font-size: 28px;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  padding-bottom: 20px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #3182ce;
    border-radius: 2px;
  }
`;

export const OrgCard = styled(InfoCard)`
  padding: 40px;
  margin: 0 auto 50px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  background: linear-gradient(to bottom right, #ffffff, #f8fafc);
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px 30px;
    align-items: baseline;

    dt {
      font-weight: 600;
      color: #2d3748;
      font-size: 16px;
      display: flex;
      align-items: center;
      white-space: nowrap;

      &:before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: #3182ce;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    dd {
      color: #4a5568;
      margin: 0;
      font-size: 15px;
      line-height: 1.6;
      padding-bottom: 4px;
      border-bottom: 1px solid #edf2f7;

      &:last-child {
        border-bottom: none;
      }
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      gap: 12px;

      dt {
        margin-top: 16px;

        &:first-child {
          margin-top: 0;
        }
      }

      dd {
        padding-left: 16px;
      }
    }
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }

  .map-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7fafc;
    color: #4a5568;
    font-size: 15px;
  }
`;
