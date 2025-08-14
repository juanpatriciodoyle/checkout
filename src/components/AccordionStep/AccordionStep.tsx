import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {CheckCircle2} from 'lucide-react';

const StepContainer = styled.div`
    background-color: ${({theme}) => theme.colors.bgWhite};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
    margin-bottom: 1rem;
    overflow: hidden;
`;

const StepHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    cursor: pointer;
    user-select: none;
`;

const StepTitle = styled.h2`
    margin: 0;
    font-size: 1.125rem;
    color: ${({theme}) => theme.colors.textMain};
`;

const ContentWrapper = styled(motion.div)`
    padding: 0 1.5rem 1.5rem;
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
    onToggle: () => void;
    children: React.ReactNode;
}

const AccordionStep: React.FC<AccordionStepProps> = ({
                                                         title,
                                                         isActive,
                                                         isCompleted,
                                                         onToggle,
                                                         children,
                                                     }) => {
    return (
        <StepContainer>
            <StepHeader onClick={onToggle}>
                <StepTitle>{title}</StepTitle>
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