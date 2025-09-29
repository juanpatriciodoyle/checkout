import React from 'react';
import styled from 'styled-components';
import {Bundle, Currency, Settings} from './types';
import {settingsConfigArray} from './settingsConfig';

const Select = styled.select`
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    border-radius: ${({theme}) => theme.borderRadius};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    background-color: ${({theme}) => theme.colors.bgSubtle};
    color: ${({theme}) => theme.colors.textMain};
    font-family: ${({theme}) => theme.fonts.body};
    font-size: 1rem;
`;

interface FormGroupRenderProps {
    currentSelection: Settings;
    handleSettingChange: (key: keyof Settings, value: Bundle | Currency) => void;
}

export const getFormGroups = ({currentSelection, handleSettingChange}: FormGroupRenderProps) => {
    return settingsConfigArray.map(preference => {
        const {key, label, options} = preference;

        const componentToRender = (
            <Select
                name={key}
                value={currentSelection[key]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleSettingChange(key, e.target.value as Bundle | Currency)
                }
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </Select>
        );

        return {
            id: key,
            label,
            component: componentToRender,
        };
    });
};