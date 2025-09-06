import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { appTexts } from '../../constants/text';

const ModalBackdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled(motion.div)`
    background-color: ${({ theme }) => theme.colors.bgWhite};
    border-radius: ${({ theme }) => theme.borderRadius};
    padding: 2rem;
    text-align: center;
    width: 90%;
    max-width: 380px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const RiveCanvasWrapper = styled.div`
    width: 200px;
    height: 200px;
    margin: -12.91rem auto 1rem;
`;

const Title = styled.h2`
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textMain};
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled(motion.p)`
    color: #E53E3E;
    font-size: 0.875rem;
    margin-top: 1rem;
    margin-bottom: 0;
    min-height: 1.2em;
`;

interface LoginModalProps {
    onLoginSuccess: () => void;
    onClose: () => void;
}

const STATE_MACHINE_NAME = 'Login Machine';

export const LoginModal: React.FC<LoginModalProps> = ({ onLoginSuccess, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const { rive, RiveComponent } = useRive({
        src: `${process.env.PUBLIC_URL}/login/animated_login_character.riv`,
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true,
    });

    const isCheckingInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'isChecking');
    const isHandsUpInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'isHandsUp');
    const trigSuccessInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'trigSuccess');
    const trigFailInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'trigFail');
    const numLookInput = useStateMachineInput(rive, STATE_MACHINE_NAME, 'numLook');

    useEffect(() => {
        if (numLookInput) {
            numLookInput.value = username.length;
        }
    }, [username, numLookInput]);

    const handlePasswordFocus = () => {
        if(isHandsUpInput) isHandsUpInput.value = true;
    };

    const handlePasswordBlur = () => {
        if(isHandsUpInput) isHandsUpInput.value = false;
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsProcessing(true);
        if(isCheckingInput) isCheckingInput.value = true;

        setTimeout(() => {
            if (username === 'kc123456' && password === 'HCL-Dem0') {
                if(trigSuccessInput) trigSuccessInput.fire();
                setTimeout(() => {
                    onLoginSuccess();
                }, 1000);
            } else {
                if(trigFailInput) trigFailInput.fire();
                setError('Invalid username or password.');
            }
            setIsProcessing(false);
            if(isCheckingInput) isCheckingInput.value = false;
        }, 1500);
    };

    return (
        <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <ModalContent
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <RiveCanvasWrapper>
                    <RiveComponent />
                </RiveCanvasWrapper>
                <Title>{appTexts.loginWithVivre}</Title>
                <form onSubmit={handleLogin}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => isCheckingInput && (isCheckingInput.value = true)}
                        onBlur={() => isCheckingInput && (isCheckingInput.value = false)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                    />
                    <LoginButton type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Logging in...' : 'Log in'}
                    </LoginButton>
                </form>
                {error && (
                    <ErrorMessage
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {error}
                    </ErrorMessage>
                )}
            </ModalContent>
        </ModalBackdrop>
    );
};