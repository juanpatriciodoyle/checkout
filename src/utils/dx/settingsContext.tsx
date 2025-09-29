import React, {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {Bundle, Currency, Settings} from './types';
import {settingsConfig} from './settingsConfig';

interface SettingsContextType {
    settings: Settings;
    setSettings: (settings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
    bundle: settingsConfig.bundle.defaultValue,
    currency: settingsConfig.currency.defaultValue,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const getInitialSettings = (): Settings => {
    try {
        const item = window.localStorage.getItem('checkoutSettings');
        const savedSettings: Partial<Settings> = item ? JSON.parse(item) : {};
        const initialSettings: { [key: string]: any } = {...defaultSettings};

        (Object.keys(savedSettings) as Array<keyof Settings>).forEach(key => {
            const config = settingsConfig[key];
            const savedValue = savedSettings[key];

            if (config && savedValue) {
                const isValid = config.options.some(
                    (option: { value: Bundle | Currency; label: string }) => option.value === savedValue
                );
                if (isValid) {
                    initialSettings[key] = savedValue;
                }
            }
        });

        return initialSettings as Settings;
    } catch (error) {
        console.error('Error reading settings from localStorage', error);
        return defaultSettings;
    }
};

export const SettingsProvider = ({children}: { children: ReactNode }) => {
    const [settings, setSettingsState] = useState<Settings>(getInitialSettings);

    useEffect(() => {
        try {
            window.localStorage.setItem('checkoutSettings', JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving settings to localStorage', error);
        }
    }, [settings]);

    const setSettings = useCallback((newSettings: Partial<Settings>) => {
        setSettingsState(prev => ({...prev, ...newSettings}));
    }, []);

    const value = useMemo(() => ({
        settings,
        setSettings,
    }), [settings, setSettings]);

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};