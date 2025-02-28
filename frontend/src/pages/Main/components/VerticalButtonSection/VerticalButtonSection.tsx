import React from 'react';
import styled from 'styled-components';
import { IconBaseProps } from 'react-icons';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';

const ProfessorIcon = FaChalkboardTeacher as React.ComponentType<IconBaseProps>;
const BookIcon = FaBook as React.ComponentType<IconBaseProps>;
const ArrowIcon = AiOutlineArrowRight as React.ComponentType<IconBaseProps>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0.6;
`;

const CardButton = styled.a`
  display: flex;
  align-items: center;
  background-color: #e9dfda;
  border-radius: 8px;
  padding: 1.5rem;
  flex: 1;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d8cdc6;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const IconWrapper = styled.div`
  margin-right: 1rem;
  font-size: 3rem;
  color: #a30027;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const SubText = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.95rem;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ArrowWrapper = styled.div`
  margin-left: auto;
  font-size: 1.5rem;
  color: #a30027;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const VerticalButtonSection: React.FC = () => {
  return (
    <Container>
      <CardButton href="/">
        <IconWrapper>
          <ProfessorIcon />
        </IconWrapper>
        <TextWrapper>
          <Title>교수진 소개</Title>
          <SubText>Meet our esteemed professors</SubText>
        </TextWrapper>
        <ArrowWrapper>
          <ArrowIcon />
        </ArrowWrapper>
      </CardButton>

      <CardButton href="/">
        <IconWrapper>
          <BookIcon />
        </IconWrapper>
        <TextWrapper>
          <Title>교과과정 안내</Title>
          <SubText>See our curriculum details</SubText>
        </TextWrapper>
        <ArrowWrapper>
          <ArrowIcon />
        </ArrowWrapper>
      </CardButton>
    </Container>
  );
};

export default VerticalButtonSection;
