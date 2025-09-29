import {Bundle, Currency} from './types';

export const CURRENCIES: { value: Currency; label: string }[] = [
    {value: 'GBP', label: 'British Pound (GBP)'},
    {value: 'EUR', label: 'Euro (EUR)'},
];

export const BUNDLES: { value: Bundle; label: string }[] = [
    {value: 'drive', label: 'Drive Safe Bundle'},
    {value: 'health', label: 'Health & Wellness Bundle'},
];

export const DEFAULT_BUNDLE: Bundle = 'drive';
export const DEFAULT_CURRENCY: Currency = 'GBP';

export const MODAL_DATA = {
    general: {
        title: 'Checkout Preferences',
        saveButton: 'Save Changes',
        bundleLabel: 'Product Bundle',
        currencyLabel: 'Currency',
    },
};

export const DX_ATTRIBUTES = {
    rootName: '__SPNS__root' //If this changes, a manual change must be done in index.html
}