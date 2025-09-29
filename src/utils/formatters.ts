import {Currency} from '../types';
import {CURRENCIES, EXCHANGE_RATE_EUR} from '../constants/text';

export const formatCurrency = (amount: number, currency: Currency) => {
    const finalAmount = currency === 'EUR' ? amount * EXCHANGE_RATE_EUR : amount;
    return `${CURRENCIES[currency]}${finalAmount.toFixed(2)}`;
};