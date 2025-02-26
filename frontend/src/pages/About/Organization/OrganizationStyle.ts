import styled from 'styled-components';
import { Content, InfoCard } from '../AboutStyle';
import { media } from '../../../styles/media';

// OrgWrapper는 제거 (전역 Container로 대체)

export const OrgContent = styled(Content)`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  ${media.mobile} {
    padding: 12px 0;
  }
`;

export const OrgCard = styled.div`
  padding: ${({ theme }) => theme.spacing['2xl']};
  margin: 0 auto 50px;
  width: 100%;
  box-sizing: border-box;

  ${media.mobile} {
    padding: 20px 10px;
    margin-bottom: 30px;
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px 30px;
    align-items: start;

    ${media.mobile} {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    dt {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.grey[500]};
      font-size: ${({ theme }) => theme.fontSizes.base};
      display: flex;
      align-items: center;
      white-space: nowrap;

      svg {
        color: ${({ theme }) => theme.colors.primary.crimson};
      }

      &:before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: ${({ theme }) => theme.colors.primary.crimson};
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    dd {
      color: ${({ theme }) => theme.colors.grey[400]};
      margin: 0;
      font-size: ${({ theme }) => theme.fontSizes.base};
      line-height: 1.6;

      .time-period {
        display: block;
        margin-top: ${({ theme }) => theme.spacing.lg};
        padding: ${({ theme }) => theme.spacing.xl};
        background-color: ${({ theme }) => theme.colors.grey[50]};
        border-radius: 8px;
        border-left: 3px solid ${({ theme }) => theme.colors.primary.crimson};

        .period-label {
          font-weight: 600;
          color: ${({ theme }) => theme.colors.grey[500]};
          margin-bottom: ${({ theme }) => theme.spacing.xs};
        }
      }

      &:not(:last-child) {
        padding-bottom: ${({ theme }) => theme.spacing.xl};
        border-bottom: 1px dashed ${({ theme }) => theme.colors.grey[200]};
      }

      ${media.mobile} {
        padding: 0 0 16px 0 !important;
        width: 100%;
      }
    }

    ${({ theme }) => theme.media.mobile} {
      grid-template-columns: 1fr;
      gap: ${({ theme }) => theme.spacing.xl};

      dt {
        margin-top: ${({ theme }) => theme.spacing.xl};
        padding: ${({ theme }) => theme.spacing.base};
        background-color: ${({ theme }) => theme.colors.grey[50]};
        border-radius: 6px;
        padding-left: ${({ theme }) => theme.spacing.xl};

        &:first-child {
          margin-top: 0;
        }

        svg {
          margin-right: ${({ theme }) => theme.spacing.base};
        }

        &:before {
          display: none;
        }
      }

      dd {
        padding-left: ${({ theme }) => theme.spacing.xl};

        .time-period {
          margin-left: -${({ theme }) => theme.spacing.xl};
          margin-right: -${({ theme }) => theme.spacing.xl};
          border-radius: 0;
        }
      }
    }
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  overflow: hidden;
  box-sizing: border-box;

  ${media.mobile} {
    height: 350px;
  }

  .map-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.grey[50]};
    color: ${({ theme }) => theme.colors.grey[400]};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;
