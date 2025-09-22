import React from 'react';

export type Currency = 'GBP' | 'EUR';

export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    color: string;
    availableColors: string[];
    availableImages: { [color: string]: string };
}

export interface ShippingMethodI {
    id: string;
    name: string;
    cost: number;
    eta: string;
    icon: React.ComponentType<any>;
    recommended?: boolean;
}

export interface VivreDiscount {
    applied: boolean;
    discountPercentage: number;
}

export interface Coupon {
    code: string;
    discountPercentage: number;
}

export interface ContactInfo {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
}

export interface OrderData {
    items: CartItem[];
    subtotal: number;
    shipping: ShippingMethodI;
    vivreDiscount: VivreDiscount;
    coupon?: Coupon;
    total: number;
    contactInfo?: ContactInfo;
    paymentMethod: string;
    trackingNumber: string;
    estimatedArrival: string;
    scheduledDate?: Date;
    currency: Currency;
}

declare global {
    namespace google.payments.api {
        interface IsReadyToPayRequest {
            apiVersion: number;
            apiVersionMinor: number;
            allowedPaymentMethods: AllowedPaymentMethod[];
        }

        interface PaymentDataRequest {
            apiVersion: number;
            apiVersionMinor: number;
            allowedPaymentMethods: AllowedPaymentMethod[];
            merchantInfo: MerchantInfo;
            transactionInfo: TransactionInfo;
            callbackIntents?: string[];
            shippingAddressRequired?: boolean;
            shippingAddressParameters?: ShippingAddressParameters;
            shippingOptionRequired?: boolean;
            shippingOptionParameters?: ShippingOptionParameters;
        }

        interface AllowedPaymentMethod {
            type: 'CARD';
            parameters: CardParameters;
            tokenizationSpecification: TokenizationSpecification;
        }

        interface CardParameters {
            allowedAuthMethods: string[];
            allowedCardNetworks: string[];
        }

        interface TokenizationSpecification {
            type: 'PAYMENT_GATEWAY';
            parameters: {
                gateway: string;
                gatewayMerchantId: string;
            };
        }

        interface MerchantInfo {
            merchantId: string;
            merchantName: string;
        }

        interface TransactionInfo {
            totalPriceStatus: 'FINAL' | 'NOT_CURRENTLY_KNOWN' | 'ESTIMATED';
            totalPrice: string;
            currencyCode: string;
            countryCode: string;
            displayItems?: DisplayItem[];
            totalPriceLabel?: string;
        }

        interface DisplayItem {
            label: string;
            type: 'LINE_ITEM' | 'SUBTOTAL';
            price: string;
            status?: 'FINAL' | 'PENDING';
        }

        interface PaymentData {
            apiVersion: number;
            apiVersionMinor: number;
            paymentMethodData: PaymentMethodData;
        }

        interface PaymentMethodData {
            description: string;
            info: CardInfo;
            tokenizationData: TokenizationData;
            type: 'CARD';
        }

        interface CardInfo {
            cardDetails: string;
            cardNetwork: string;
        }

        interface TokenizationData {
            token: string;
            type: 'PAYMENT_GATEWAY';
        }

        interface PaymentOptions {
            environment?: 'TEST' | 'PRODUCTION';
            paymentDataCallbacks?: PaymentDataCallbacks;
        }

        interface PaymentDataCallbacks {
            onPaymentAuthorized: (paymentData: PaymentData) => Promise<PaymentAuthorizationResult>;
            onPaymentDataChanged: (intermediatePaymentData: IntermediatePaymentData) => Promise<PaymentDataRequestUpdate>;
        }

        interface PaymentAuthorizationResult {
            transactionState: 'SUCCESS' | 'ERROR';
            error?: PaymentDataError;
        }

        interface IntermediatePaymentData {
            callbackTrigger: 'INITIALIZE' | 'SHIPPING_ADDRESS' | 'SHIPPING_OPTION';
            shippingAddress?: Address;
            shippingOptionData?: { id: string };
        }

        interface Address {
            address1: string;
            address2: string;
            address3: string;
            administrativeArea: string;
            countryCode: string;
            locality: string;
            name: string;
            postalCode: string;
            sortingCode: string;
        }

        interface PaymentDataRequestUpdate {
            newTransactionInfo?: TransactionInfo;
            newShippingOptionParameters?: ShippingOptionParameters;
            error?: PaymentDataError;
        }

        interface ShippingAddressParameters {
            phoneNumberRequired?: boolean;
            allowedCountryCodes?: string[];
        }

        interface ShippingOptionParameters {
            defaultSelectedOptionId?: string;
            shippingOptions: ShippingOption[];
        }

        interface ShippingOption {
            id: string;
            label: string;
            description: string;
        }

        interface PaymentDataError {
            reason: 'SHIPPING_ADDRESS_UNSERVICEABLE' | 'PAYMENT_DATA_INVALID' | 'OTHER';
            message: string;
            intent: 'SHIPPING_ADDRESS' | 'SHIPPING_OPTION' | 'PAYMENT_AUTHORIZATION';
        }

        interface IsReadyToPayResponse {
            result: boolean;
            paymentMethodPresent?: boolean;
        }

        class PaymentsClient {
            constructor(paymentOptions: PaymentOptions);

            isReadyToPay(isReadyToPayRequest: IsReadyToPayRequest): Promise<IsReadyToPayResponse>;

            loadPaymentData(paymentDataRequest: PaymentDataRequest): Promise<PaymentData>;

            createButton(options: { onClick: () => void, [key: string]: any }): HTMLElement;
        }
    }
}