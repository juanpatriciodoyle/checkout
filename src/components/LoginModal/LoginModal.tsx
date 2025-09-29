import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useRive, useStateMachineInput} from '@rive-app/react-canvas';
import {appTexts} from '../../constants/text';

const ModalBackdrop = styled(motion.div)`
    box-sizing: border-box;
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
    box-sizing: border-box;
    background-color: ${({theme}) => theme.colors.bgWhite};
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 2rem;
    text-align: center;
    width: 90%;
    max-width: 380px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const RiveCanvasWrapper = styled.div`
    width: 250px;
    height: 250px;
    margin: -6rem auto 0;
`;

const Title = styled.h2`
    margin: 0 0 1.5rem;
    font-size: 1.5rem;
    color: ${({theme}) => theme.colors.textMain};
`;

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: ${({theme}) => theme.borderRadius};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    font-size: 1rem;

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

const LoginButton = styled.button<{ $isProcessing?: boolean }>`
    box-sizing: border-box;
    z-index: 1;
    position: relative;
    padding: 0.75rem;
    width: 100%;
    text-align: center;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    background-color: ${({$isProcessing}) => ($isProcessing ? '#a989ce' : '#d00a75')};
    outline: none;
    border: none;
    transition: color 0.5s, background-color 0.3s ease-in-out;
    cursor: pointer;
    border-radius: ${({theme}) => theme.borderRadius};

    .blob-btn__inner {
        z-index: -1;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: ${({theme}) => theme.borderRadius};
    }

    .blob-btn__blobs {
        position: relative;
        display: block;
        height: 100%;
        filter: url('#goo');
    }

    .blob-btn__blob {
        position: absolute;
        top: 2px;
        width: 25%;
        height: 100%;
        background: ${({theme}) => theme.colors.primary};
        border-radius: 100%;
        transform: translate3d(0, 150%, 0) scale(1.7);
        transition: transform 0.45s;

        @supports (filter: url('#goo')) {
            transform: translate3d(0, 150%, 0) scale(1.4);
        }

        &:nth-child(1) {
            left: 0;
            transition-delay: 0s;
        }

        &:nth-child(2) {
            left: 25%;
            transition-delay: 0.08s;
        }

        &:nth-child(3) {
            left: 50%;
            transition-delay: 0.16s;
        }

        &:nth-child(4) {
            left: 75%;
            transition-delay: 0.24s;
        }
    }

    &:hover:not(:disabled) .blob-btn__blob,
    &.success .blob-btn__blob {
        transform: translateZ(0) scale(1.7);
        @supports (filter: url('#goo')) {
            transform: translateZ(0) scale(1.4);
        }
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

export const LoginModal: React.FC<LoginModalProps> = ({onLoginSuccess, onClose}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {rive, RiveComponent} = useRive({
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
        if (isHandsUpInput) isHandsUpInput.value = true;
    };

    const handlePasswordBlur = () => {
        if (isHandsUpInput) isHandsUpInput.value = false;
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsProcessing(true);
        if (isCheckingInput) isCheckingInput.value = true;

        setTimeout(() => {
            if (username === 'kc123456' && password === 'HCL-Dem0') {
                if (trigSuccessInput) trigSuccessInput.fire();
                setIsSuccess(true);
                setTimeout(() => {
                    onLoginSuccess();
                }, 1000);
            } else {
                if (trigFailInput) trigFailInput.fire();
                setError('Invalid username or password.');
                setIsProcessing(false);
                if (isCheckingInput) isCheckingInput.value = false;
            }
        }, 1500);
    };

    return (
        <ModalBackdrop
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
        >
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{display: 'none'}}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                                       result="goo"></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>
            <ModalContent
                initial={{y: -50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: -50, opacity: 0}}
                onClick={(e) => e.stopPropagation()}
            >
                <RiveCanvasWrapper>
                    <RiveComponent/>
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
                    <LoginButton
                        type="submit"
                        disabled={isProcessing}
                        $isProcessing={isProcessing}
                        className={isSuccess ? 'success' : ''}
                    >
                        {isProcessing ? 'Logging in...' : 'Log in'}
                        <span className="blob-btn__inner">
                            <span className="blob-btn__blobs">
                                <span className="blob-btn__blob"></span>
                                <span className="blob-btn__blob"></span>
                                <span className="blob-btn__blob"></span>
                                <span className="blob-btn__blob"></span>
                            </span>
                        </span>
                    </LoginButton>
                </form>
                {error && (
                    <ErrorMessage
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {error}
                    </ErrorMessage>
                )}
            </ModalContent>
        </ModalBackdrop>
    );
};