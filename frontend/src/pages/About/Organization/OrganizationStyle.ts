import styled from 'styled-components';
import { Wrapper, Content, Title, InfoCard } from '../AboutStyle';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const OrgWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 40px 20px;
  max-width: 1400px;
  width: 80vw;

  ${media.mobile} {
    padding: 20px 0;
    width: 90vw;
  }
`;

export const OrgContent = styled(Content)`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 800px;
  margin: 0 auto;

  ${media.mobile} {
    padding: 12px 0;
    /* background-color: tomato; */
  }
`;

export const OrgTitle = styled(Title)`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
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
    background-color: ${({ theme }) => theme.colors.primary.crimson};
    border-radius: 2px;
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

export const OrgCard = styled(InfoCard)`
  padding: ${({ theme }) => theme.spacing['3xl']};
  margin: 0 auto 50px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all ${({ theme }) => theme.transitions.fast};
  background: linear-gradient(
    to bottom right,
    ${({ theme }) => theme.colors.white},
    #f8fafc
  );
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }

  ${media.mobile} {
    padding: 32px;
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  transition: all ${({ theme }) => theme.transitions.fast};

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
    background-color: ${({ theme }) => theme.colors.grey[50]};
    color: ${({ theme }) => theme.colors.grey[400]};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;
