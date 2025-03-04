import styled, { css } from 'styled-components';
import { media } from '../../../../styles/media';
export const ButtonListContainer = styled.section`
  width: 100%;
  margin: 0 auto;
`;

export const ButtonListList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  list-style: none;
  margin: 0;
  ${media.tablet} {
    margin-top: 10px;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding-top: 10px;
  }
`;

interface ButtonListItemProps {
  isSeminar?: boolean;
}

export const ButtonListItem = styled.li<ButtonListItemProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-left: 1px solid #ddd;

  &:first-child {
    border-left: none;
  }

  ${({ isSeminar }) =>
    isSeminar &&
    css`
      background-color: #a30027;
      color: #fff;
      position: relative;
      flex: 1.5;
      display: block;

      &:hover {
        background-color: #ae283f;
      }
    `}

  a {
    width: 100%;
    height: 100%;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.3s ease;

    img {
      width: 64px;
      height: 64px;
      margin-bottom: 0.5rem;
    }

    span {
      font-size: 1.5rem;
      font-weight: 800;
      padding: 1rem 0;
    }

    svg {
      width: 6rem;
      height: 6rem;
    }

    &:hover {
      background-color: #f9f9f9;

      span {
        color: #a30027;
      }

      svg {
        color: #a30027;
      }
    }

    @media (max-width: 768px) {
      svg {
        width: 3rem;
        height: 3rem;
      }
    }
  }

  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 1px);

    ${({ isSeminar }) =>
      isSeminar &&
      css`
        flex: 0 0 100%;
        margin-top: 1rem;
      `}
  }
`;

export const SeminarInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  height: 100%;
`;
export const SeminarInfoTop = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`;

export const SeminarInfoTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
`;

export const SeminarInfoSubtitle = styled.p`
  font-size: 1rem;
  margin: 0.25rem 0;
  line-height: 1.4;
`;

export const InfoIconWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border: 2px solid #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: #fff;
    font-weight: bold;
  }
`;
