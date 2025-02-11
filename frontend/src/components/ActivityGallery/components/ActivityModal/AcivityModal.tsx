import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { ActivityImage } from '../../types/activity.types';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 900px;
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
  padding: 8px;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
`;

interface ActivityModalProps {
  image: ActivityImage;
  onClose: () => void;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ image, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        <ModalImage src={image.url} alt={image.title} />
      </ModalContent>
    </ModalOverlay>
  );
};

export default ActivityModal;
