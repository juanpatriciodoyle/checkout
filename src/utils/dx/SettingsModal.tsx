import React, {ReactNode, useEffect, useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, AnimatePresenceProps, motion} from 'framer-motion';
import {X} from 'lucide-react';
import {useSettings} from './settingsContext';
import {Bundle, Currency, Settings} from './types';
import {MODAL_DATA} from './dx-data';
import {getFormGroups} from './formGroups';

type SafeAnimatePresenceProps = AnimatePresenceProps & {
    children: ReactNode;
};
const SafeAnimatePresence = AnimatePresence as React.FC<SafeAnimatePresenceProps>;

const ModalBackdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled(motion.div)`
    box-sizing: border-box;
    background: ${({theme}) => theme.colors.bgWhite};
    padding: 32px;
    border-radius: ${({theme}) => theme.borderRadius};
    width: 100%;
    max-width: 400px;
    position: relative;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
`;

const CloseButton = styled.button`
    box-sizing: border-box;
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    color: ${({theme}) => theme.colors.textLight};
`;

const FormGroup = styled.div`
    margin-bottom: 24px;
`;

const FormLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
`;

const SaveButton = styled.button`
    box-sizing: border-box;
    width: 100%;
    margin-top: 16px;
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.bgWhite};
    border: none;
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;


interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({isOpen, onClose}) => {
    const {settings, setSettings} = useSettings();
    const [currentSelection, setCurrentSelection] = useState<Settings>(settings);

    useEffect(() => {
        if (isOpen) {
            setCurrentSelection(settings);
        }
    }, [settings, isOpen]);

    const handleSave = () => {
        setSettings(currentSelection);
        onClose();
    };

    const handleSettingChange = (key: keyof Settings, value: Bundle | Currency) => {
        setCurrentSelection((prev: Settings) => ({...prev, [key]: value}));
    };

    const formGroups = getFormGroups({currentSelection, handleSettingChange});

    return (
        <SafeAnimatePresence>
            {isOpen && (
                <ModalBackdrop
                    onClick={onClose}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <ModalContent
                        onClick={(e) => e.stopPropagation()}
                        initial={{y: -50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: 50, opacity: 0}}
                    >
                        <CloseButton onClick={onClose}><X/></CloseButton>
                        <h2 style={{marginBottom: '32px'}}>
                            {MODAL_DATA.general.title}
                        </h2>

                        {formGroups.map((group) => (
                            <FormGroup key={group.id}>
                                <FormLabel>{group.label}</FormLabel>
                                {group.component}
                            </FormGroup>
                        ))}

                        <SaveButton onClick={handleSave}>
                            {MODAL_DATA.general.saveButton}
                        </SaveButton>
                    </ModalContent>
                </ModalBackdrop>
            )}
        </SafeAnimatePresence>
    );
};