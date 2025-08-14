import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
    position: relative;
    margin-bottom: 1.5rem;
`;

const InputField = styled.input`
    width: 100%;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: ${({theme}) => theme.borderRadius};
    padding: 0.75rem;
    font-size: 1rem;
    background-color: transparent;

    &:focus {
        outline: none;
        border-color: ${({theme}) => theme.colors.primary};
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
        transform: translateY(-1.75rem) scale(0.8);
        background-color: ${({theme}) => theme.colors.bgWhite};
        padding: 0 0.25rem;
    }
`;

const InputLabel = styled.label`
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    color: ${({theme}) => theme.colors.textLight};
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    transform-origin: left top;
`;

interface FloatingLabelInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
                                                                          label,
                                                                          name,
                                                                          value,
                                                                          onChange,
                                                                          type = 'text',
                                                                      }) => {
    return (
        <InputWrapper>
            <InputField
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder=" "
            />
            <InputLabel htmlFor={name}>{label}</InputLabel>
        </InputWrapper>
    );
};