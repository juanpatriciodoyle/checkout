import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {CheckCircle2} from 'lucide-react';

const StepContainer = styled.div`
    box-sizing: border-box;
    background-color: ${({theme}) => theme.colors.bgWhite};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    margin-bottom: 1rem;
    overflow: hidden;
`;

const StepHeader = styled.div<{ $isLocked: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    cursor: ${({$isLocked}) => ($isLocked ? 'not-allowed' : 'pointer')};
    user-select: none;
`;

const StepTitle = styled.h2<{ $isLocked: boolean }>`
    margin: 0;
    font-size: 1.125rem;
    color: ${({$isLocked, theme}) => ($isLocked ? theme.colors.textLight : theme.colors.textMain)};
    transition: color 0.2s ease-in-out;
`;

const ContentWrapper = styled(motion.div)`
    padding: 1.5rem;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
`;

const contentVariants = {
    initial: {opacity: 0, height: 0},
    animate: {
        opacity: 1,
        height: 'auto',
        transition: {duration: 0.3, ease: 'easeInOut'},
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {duration: 0.3, ease: 'easeInOut'},
    },
};

interface AccordionStepProps {
    title: string;
    stepNumber: number;
    isActive: boolean;
    isCompleted: boolean;
    isLocked: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

const AccordionStep: React.FC<AccordionStepProps> = ({
                                                         title,
                                                         isActive,
                                                         isCompleted,
                                                         isLocked,
                                                         onToggle,
                                                         children,
                                                     }) => {
    return (
        <StepContainer>
            <StepHeader onClick={onToggle} $isLocked={isLocked}>
                <StepTitle $isLocked={isLocked}>{title}</StepTitle>
                {isCompleted && <CheckCircle2 color="green"/>}
            </StepHeader>
            {isActive && (
                <ContentWrapper
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    {children}
                </ContentWrapper>
            )}
        </StepContainer>
    );
};

export default AccordionStep;