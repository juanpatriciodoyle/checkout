import React from 'react';
import styled, {css} from 'styled-components';
import {Settings} from 'lucide-react';

const activeStyles = css`
    transform: scale(1.2);

    svg {
        transform: rotate(170deg);
    }
`;

const StyledButton = styled.button<{ $isActive: boolean }>`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.bgWhite};
    border: none;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 999;
    box-sizing: border-box;
    transition: transform 0.2s ease-out;

    svg {
        transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    }

    &:hover {
        ${activeStyles}
    }

    ${({$isActive}) => $isActive && activeStyles}

`;

interface SettingsButtonProps {
    onClick: () => void;
    isActive: boolean;
    isLocalhost: boolean;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({onClick, isActive, isLocalhost}) => {
    return (
        <StyledButton
            className={isLocalhost ? '' : 'hide_in_view_mode'}
            onClick={onClick}
            $isActive={isActive}
        >
            <Settings size={25}/>
        </StyledButton>
    );
};