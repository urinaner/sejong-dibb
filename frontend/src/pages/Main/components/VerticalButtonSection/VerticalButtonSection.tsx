import React from 'react';
import { IconBaseProps } from 'react-icons';
import { AiOutlineArrowRight } from 'react-icons/ai';

import {
  Container,
  CardButton,
  IconWrapper,
  TextWrapper,
  Title,
  SubText,
  ArrowWrapper,
} from './VerticalButtonSectionStyle';

import { cardData } from './data';

const ArrowIcon = AiOutlineArrowRight as React.ComponentType<IconBaseProps>;

const VerticalButtonSection: React.FC = () => {
  return (
    <Container>
      {cardData.map((item, index) => (
        <CardButton href={item.link} key={index}>
          <IconWrapper>
            <item.icon />
          </IconWrapper>
          <TextWrapper>
            <Title>{item.title}</Title>
            <SubText>{item.subText}</SubText>
          </TextWrapper>
          <ArrowWrapper>
            <ArrowIcon />
          </ArrowWrapper>
        </CardButton>
      ))}
    </Container>
  );
};

export default VerticalButtonSection;
