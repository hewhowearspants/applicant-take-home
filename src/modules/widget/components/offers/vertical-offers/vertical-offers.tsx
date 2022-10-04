import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Classnames from 'classnames';
import { AppDispatch } from '../../../../../store';
import {
    PrizeoutOffer,
    PrizeoutOfferSettings,
    setSelectedCard,
    setSelectedOffer,
    selectSelectedOffer,
} from '../../../../../slices/offers-slice';
import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';

import './vertical-offers.less';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
}

const VerticalOffers: React.FC<OfferView> = ({ offers, viewSettings }): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedOffer = useSelector(selectSelectedOffer);
    const heading = viewSettings.title || 'Recommended';
    const subtitle = viewSettings.subtitle || null;
    const classes: string = Classnames('vertical-offers', { '--has-subtitle': subtitle });

    const offerClickHandler = (offer: PrizeoutOffer) => {
        const selectedId = selectedOffer?.giftcard_list[0].checkout_value_id;
        const offerId = offer.giftcard_list[0].checkout_value_id;
        if (selectedId !== offerId) {
            dispatch(setSelectedOffer(offer));
        } else {
            dispatch(setSelectedOffer(null));
            dispatch(setSelectedCard(null));
        }
    };

    const returnOffers = () => {
        return offers.map((offer: PrizeoutOffer) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                onClickHandler={() => offerClickHandler(offer)}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {subtitle && <h3>{subtitle}</h3>}
            {offers && <div className="vertical-offers__gift-cards">{returnOffers()}</div>}
        </div>
    );
};

export default VerticalOffers;
