import React from 'react';
import styled from 'styled-components';
import { Info } from 'lucide-react';

const NoticeContainer = styled.div`
    display: flex;
    gap: 0.75rem;
    background-color: #EBF8FF;
    color: #2B6CB0;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

interface InfoNoticeProps {
    children: React.ReactNode;
}

export const InfoNotice: React.FC<InfoNoticeProps> = ({ children }) => {
    return (
        <NoticeContainer>
            <Info size={20} />
            <div>{children}</div>
        </NoticeContainer>
    );
};