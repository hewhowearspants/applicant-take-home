import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import {
    selectSelectedOffer,
    PrizeoutOfferValueOptions,
    setSelectedCard,
    selectSelectedCard,
} from '../../../slices/offers-slice';
import { BonusTag, GiftCardImage, Button } from '../../common';
import { currencies } from '../../../utils/constants';
import checkoutPanelViewWrapper from '../view-wrapper';

import CheckoutButton from './checkout-button';

import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedOffer = useSelector(selectSelectedOffer);
    const selectedCard = useSelector(selectSelectedCard);

    const cardClickHandler = (giftCardOption: PrizeoutOfferValueOptions) => {
        const selectedId = selectedCard?.checkout_value_id;
        const cardId = giftCardOption.checkout_value_id;
        if (selectedId !== cardId) {
            dispatch(setSelectedCard(giftCardOption));
        } else {
            dispatch(setSelectedCard(null));
        }
    };

    const renderGiftCardOption = (giftCardOption: PrizeoutOfferValueOptions) => {
        const offerCostInDollars = (giftCardOption.cost_in_cents / 100).toFixed(2);
        const offerValueInDollars = (giftCardOption.value_in_cents / 100).toFixed(2);
        const currencySymbol = currencies[selectedOffer.currency_code];

        return (
            <section className="gift-card-option" key={giftCardOption.checkout_value_id}>
                <div className="gift-card-option-options">
                    <p className="gift-card-option-value">
                        Value: {currencySymbol && currencySymbol}
                        {offerValueInDollars}
                        {!currencySymbol && ` ${selectedOffer.currency_code}`}
                    </p>
                    <p className="gift-card-option-cost">
                        Cost: {currencySymbol && currencySymbol}
                        {offerCostInDollars}
                        {!currencySymbol && ` ${selectedOffer.currency_code}`}
                    </p>
                </div>
                <div className="gift-card-option-select-button">
                    <Button
                        ariaLabel={`Select ${offerValueInDollars} Option`}
                        onClick={() => cardClickHandler(giftCardOption)}
                        text={selectedCard?.checkout_value_id === giftCardOption.checkout_value_id ? "Selected" : "Select"}
                        color="primary"
                        type="submit"
                        size="medium"
                    />
                </div>
            </section>
        );
    };

    const renderOfferData = () => {
        const firstGiftCard = selectedOffer.giftcard_list[0];
        const offerType = firstGiftCard.display_monetary_bonus ? 'monetary' : 'percentage';
        const offerValue = firstGiftCard.display_bonus;

        return (
            <>
                <div className="offer-details">
                    <GiftCardImage imgUrl={selectedOffer.image_url} altText={selectedOffer.name} />
                    <p className="offer-name">{selectedOffer.name}</p>
                    <BonusTag type={offerType} value={offerValue} size="small" />
                </div>
                <div className="offer gift-card-options">
                    {selectedOffer.giftcard_list.map((giftCard: PrizeoutOfferValueOptions) => {
                        return renderGiftCardOption(giftCard);
                    })}
                </div>
            </>
        );
    };

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item no-scrollbars">
                    <section className="checkout__brand">
                        {selectedOffer ? renderOfferData() : 'Please select an offer'}
                    </section>
                </div>
                <div className="grid__item">
                    {selectedOffer && (
                        <section className="checkout__calculation">
                            <CheckoutButton />
                        </section>
                    )}
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
