import {Settings} from './types';
import {BUNDLES, CURRENCIES, DEFAULT_BUNDLE, DEFAULT_CURRENCY, MODAL_DATA} from './dx-data';

export interface SettingConfig<K extends keyof Settings> {
    key: K;
    label: string;
    defaultValue: Settings[K];
    options: ReadonlyArray<{ value: Settings[K]; label: string }>;
}

const bundleConfig: SettingConfig<'bundle'> = {
    key: 'bundle',
    label: MODAL_DATA.general.bundleLabel,
    defaultValue: DEFAULT_BUNDLE,
    options: BUNDLES,
};

const currencyConfig: SettingConfig<'currency'> = {
    key: 'currency',
    label: MODAL_DATA.general.currencyLabel,
    defaultValue: DEFAULT_CURRENCY,
    options: CURRENCIES,
};

export const settingsConfig = {
    bundle: bundleConfig,
    currency: currencyConfig,
};

export const settingsConfigArray = Object.values(settingsConfig);