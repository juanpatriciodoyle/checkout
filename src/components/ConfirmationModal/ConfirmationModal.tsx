import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {CheckCircle2} from 'lucide-react';
import {appTexts} from '../../constants/text';

const ModalBackdrop = styled(motion.div)`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled(motion.div)`
    box-sizing: border-box;
    background-color: ${({theme}) => theme.colors.bgWhite};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    padding: 3rem;
    text-align: center;
    width: 90%;
    max-width: 450px;
`;

const IconWrapper = styled(motion.div)`
    margin-bottom: 1.5rem;
    color: ${({theme}) => theme.colors.success};
`;

const Title = styled.h2`
    margin: 0 0 0.5rem;
    font-size: 1.75rem;
`;

const Subtitle = styled.h3`
    margin: 0 0 2rem;
    font-weight: 400;
    color: ${({theme}) => theme.colors.textLight};
`;

const DetailsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 2rem;
    text-align: left;
`;

const DetailItem = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};

    &:first-child {
        border-top: 1px solid ${({theme}) => theme.colors.borderColor};
    }
`;

const HomepageButton = styled.button`
    box-sizing: border-box;
    background-color: transparent;
    color: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({theme}) => theme.colors.primary};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${({theme}) => theme.colors.bgSubtle};
    }
`;

const backdropVariants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
};

const modalVariants = {
    hidden: {scale: 0.9, opacity: 0},
    visible: {scale: 1, opacity: 1, transition: {duration: 0.3}},
};

interface ConfirmationModalProps {
    trackingNumber: string;
    estimatedArrival: string;
    onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                        trackingNumber,
                                                                        estimatedArrival,
                                                                        onClose,
                                                                    }) => {
    return (
        <ModalBackdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <ModalContent variants={modalVariants}>
                <IconWrapper
                    initial={{scale: 0}}
                    animate={{scale: 1, transition: {delay: 0.2, type: 'spring'}}}
                >
                    <CheckCircle2 size={64}/>
                </IconWrapper>
                <Title>{appTexts.confirmationTitle}</Title>
                <Subtitle>{appTexts.confirmationSubtitle}</Subtitle>
                <DetailsList>
                    <DetailItem>
                        <span>{appTexts.trackingNumber}</span>
                        <strong>{trackingNumber}</strong>
                    </DetailItem>
                    <DetailItem>
                        <span>{appTexts.estimatedArrival}</span>
                        <strong>{estimatedArrival}</strong>
                    </DetailItem>
                </DetailsList>
                <HomepageButton onClick={onClose}>{appTexts.goToHomepage}</HomepageButton>
            </ModalContent>
        </ModalBackdrop>
    );
};