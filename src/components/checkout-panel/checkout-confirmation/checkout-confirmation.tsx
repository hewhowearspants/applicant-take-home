import React from 'react';
import PropTypes from 'prop-types';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import { Button } from '../../common';
import './checkout-confirmation.less';

const CheckoutConfirmationPanelView: React.FC<SetViewProps> = ({ setView }): React.ReactElement => {
    return (
        <section className="checkout-confirmation">
            <h2>Checkout Confirmation Panel</h2>
            <Button ariaLabel="Done" color="primary" onClick={() => setView('checkout')} text="Done" size="medium" />
        </section>
    );
};

CheckoutConfirmationPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutConfirmationPanelView, 'checkout-confirmation');
