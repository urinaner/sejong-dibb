// DivWrapperStyles.ts
import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #fff;
`;

export const Content = styled.div`
    text-align: center;
    padding: 20px;
`;

export const Title = styled.h2`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const Description = styled.p`
    font-size: 1rem;
    margin-bottom: 20px;
`;

export const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
    }
`;

export const InfoCard = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    width: 100%;
    max-width: 500px;
`;

export const InfoTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
`;

export const InfoDescription = styled.p`
    font-size: 1rem;
    margin-top: 10px;
`;