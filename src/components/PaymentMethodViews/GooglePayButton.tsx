import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { appTexts, SHIPPING_OPTIONS } from '../../constants/text';
import { OrderData } from '../../types';

const GooglePayButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 48px;
    margin-top: 1rem;
`;

interface GooglePayButtonProps {
    orderData: OrderData;
    onPaymentAuthorized: () => void;
}

const baseRequest: Omit<google.payments.api.IsReadyToPayRequest, 'allowedPaymentMethods'> = {
    apiVersion: 2,
    apiVersionMinor: 0,
};

const allowedPaymentMethods: google.payments.api.AllowedPaymentMethod[] = [
    {
        type: 'CARD',
        parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
            },
        },
    },
];

const merchantInfo: google.payments.api.MerchantInfo = {
    merchantId: '12345678901234567890',
    merchantName: 'Vivre',
};

export const GooglePayButton: React.FC<GooglePayButtonProps> = ({ orderData, onPaymentAuthorized }) => {
    const [googlePayClient, setGooglePayClient] = useState<google.payments.api.PaymentsClient | null>(null);
    const [canUseGooglePay, setCanUseGooglePay] = useState(false);
    const buttonContainerRef = useRef<HTMLDivElement>(null);

    const getTransactionInfo = useCallback((shippingOptionId?: string): google.payments.api.TransactionInfo => {
        const { subtotal, shipping, vivreDiscount, coupon } = orderData;
        const selectedShipping = SHIPPING_OPTIONS.find(opt => opt.id === shippingOptionId) || shipping;

        const displayItems: google.payments.api.DisplayItem[] = [
            {
                label: "Subtotal",
                type: "SUBTOTAL",
                price: subtotal.toFixed(2),
            },
            {
                label: "Shipping cost",
                type: "LINE_ITEM",
                price: selectedShipping.cost.toFixed(2),
                status: "FINAL"
            }
        ];

        let total = subtotal + selectedShipping.cost;

        if (vivreDiscount.applied) {
            const discountAmount = subtotal * vivreDiscount.discountPercentage;
            displayItems.push({
                label: appTexts.discount,
                type: 'LINE_ITEM',
                price: `-${discountAmount.toFixed(2)}`
            });
            total -= discountAmount;
        }

        if (coupon) {
            const memberDiscount = vivreDiscount.applied ? subtotal * vivreDiscount.discountPercentage : 0;
            const couponDiscountAmount = (subtotal - memberDiscount) * coupon.discountPercentage;
            displayItems.push({
                label: `Coupon (${coupon.code})`,
                type: 'LINE_ITEM',
                price: `-${couponDiscountAmount.toFixed(2)}`
            });
            total -= couponDiscountAmount;
        }

        return {
            totalPriceStatus: 'FINAL',
            totalPrice: total.toFixed(2),
            currencyCode: 'GBP',
            countryCode: 'GB',
            displayItems,
            totalPriceLabel: "Total"
        };
    }, [orderData]);

    const onPaymentDataChanged = useCallback((intermediatePaymentData: google.payments.api.IntermediatePaymentData): Promise<google.payments.api.PaymentDataRequestUpdate> => {
        return new Promise((resolve) => {
            const shippingOptionId = intermediatePaymentData.shippingOptionData?.id;
            const paymentDataRequestUpdate: google.payments.api.PaymentDataRequestUpdate = {};
            paymentDataRequestUpdate.newTransactionInfo = getTransactionInfo(shippingOptionId);
            resolve(paymentDataRequestUpdate);
        });
    }, [getTransactionInfo]);

    const handlePaymentAuthorized = useCallback((_paymentData: google.payments.api.PaymentData) => {
        return new Promise<google.payments.api.PaymentAuthorizationResult>((resolve) => {
            onPaymentAuthorized();
            resolve({ transactionState: 'SUCCESS' });
        });
    }, [onPaymentAuthorized]);

    const onGooglePayClicked = useCallback(() => {
        if (!googlePayClient) return;

        const googleShippingOptions: google.payments.api.ShippingOption[] = SHIPPING_OPTIONS.map(option => ({
            id: option.id,
            label: `£${option.cost.toFixed(2)}: ${option.name}`,
            description: option.eta,
        }));

        const shippingOptionParameters: google.payments.api.ShippingOptionParameters = {
            shippingOptions: googleShippingOptions,
            defaultSelectedOptionId: orderData.shipping.id,
        };

        const paymentDataRequest: google.payments.api.PaymentDataRequest = {
            ...baseRequest,
            allowedPaymentMethods,
            merchantInfo,
            transactionInfo: getTransactionInfo(),
            callbackIntents: ["SHIPPING_ADDRESS", "SHIPPING_OPTION", "PAYMENT_AUTHORIZATION"],
            shippingAddressRequired: true,
            shippingAddressParameters: {
                phoneNumberRequired: true,
                allowedCountryCodes: ['GB']
            },
            shippingOptionRequired: true,
        };

        paymentDataRequest.shippingOptionParameters = shippingOptionParameters;

        googlePayClient.loadPaymentData(paymentDataRequest).catch(console.error);
    }, [googlePayClient, orderData.shipping.id, getTransactionInfo]);

    useEffect(() => {
        const client = new google.payments.api.PaymentsClient({
            environment: 'TEST',
            paymentDataCallbacks: {
                onPaymentDataChanged: onPaymentDataChanged,
                onPaymentAuthorized: handlePaymentAuthorized,
            },
        });
        setGooglePayClient(client);
    }, [handlePaymentAuthorized, onPaymentDataChanged]);

    useEffect(() => {
        if (!googlePayClient) return;

        const isReadyToPayRequest = { ...baseRequest, allowedPaymentMethods };
        googlePayClient.isReadyToPay(isReadyToPayRequest)
            .then(response => {
                setCanUseGooglePay(response.result);
            })
            .catch(console.error);
    }, [googlePayClient]);

    useEffect(() => {
        if (canUseGooglePay && googlePayClient && buttonContainerRef.current) {
            const button = googlePayClient.createButton({
                onClick: onGooglePayClicked,
                buttonType: 'buy',
                buttonColor: 'black',
            });
            buttonContainerRef.current.innerHTML = '';
            buttonContainerRef.current.appendChild(button);
        }
    }, [canUseGooglePay, googlePayClient, onGooglePayClicked]);

    return (
        <GooglePayButtonWrapper>
            {!canUseGooglePay && <div>{appTexts.googlePayNotSupported}</div>}
            <div ref={buttonContainerRef} />
        </GooglePayButtonWrapper>
    );
};