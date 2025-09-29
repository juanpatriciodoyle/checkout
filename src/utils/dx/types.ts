export type Currency = 'GBP' | 'EUR';
export type Bundle = 'drive' | 'health';

export interface Settings {
    bundle: Bundle;
    currency: Currency;
}