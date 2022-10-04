import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { selectSelectedCard, selectSelectedOffer, setSelectedCard } from '../../../slices/offers-slice';
import { setCheckoutView, setCheckoutStatus, selectCheckoutStatus } from '../../../slices/checkout-slice';
import { Button } from '../../common';

import './checkout-button.less';

export interface CheckoutPayload {
    checkout_value_id: string;
    cost_in_cents: number;
    name: string;
    value_in_cents: number;
}

const CheckoutButton: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedCard = useSelector(selectSelectedCard);
    const selectedOffer = useSelector(selectSelectedOffer);
    const checkoutStatus = useSelector(selectCheckoutStatus);

    const buttonText = 'Prizeout Gift Card';
    const buttonDisabled = !selectedCard || checkoutStatus === 'PENDING';

    // I couldn't find any modules that would handle api calls, so I decided to just mock it here for ease of readability
    // Ideally it would be broken out into a new module
    const buttonHandler = async () => {
        const payload: CheckoutPayload = {
            checkout_value_id: selectedCard.checkout_value_id,
            cost_in_cents: selectedCard.cost_in_cents,
            name: selectedOffer.name,
            value_in_cents: selectedCard.value_in_cents,
        };

        const apiCall = Promise.resolve({
            payload,
            status: 'SUCCESS',
        });

        dispatch(setCheckoutStatus('PENDING'));
        const response = await apiCall;

        if (response.status === 'SUCCESS') {
            dispatch(setCheckoutStatus('SUCCESS'));
            dispatch(setSelectedCard(null));
            dispatch(setCheckoutView('checkout-confirmation'));
        } else {
            dispatch(setCheckoutStatus('FAILED'));
        }
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`confirm`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
                isDisabled={buttonDisabled}
            />
        </>
    );
};

export default CheckoutButton;
