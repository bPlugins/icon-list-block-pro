import { Sparkles } from '../../utils/icons';
import './UpgradeBtn.scss';

const UpgradeBtn = () => {

    const onUpgrade = (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-undef
        const checkoutConfig = new FS.Checkout({
            product_id: 17174,
            plan_id: 28639,
            public_key: 'pk_51f816736288458da2dd37c719fd3',
            image: 'https://ps.w.org/icon-list-block/assets/icon-128x128.png?rev=2697392',
        });

        checkoutConfig.open({
            title: 'Icon List Block Pro',
            licenses: 1,
            // You can consume the response for after purchase logic.
            // eslint-disable-next-line no-unused-vars
            purchaseCompleted: (res) => {
                // The logic here will be executed immediately after the purchase confirmation.
                // alert(response.user.email);
            },
            // eslint-disable-next-line no-unused-vars
            success: (res) => {
                // The logic here will be executed after the customer closes the checkout, after a successful purchase.
                // alert(response.user.email);
            }
        });
        e.preventDefault();
    }

    // return <div className="upgrade-btn-container">
    //     <a className="button button-primary upgrade-btn" onClick={onUpgrade}>🎉 Upgrade to Pro</a>
    // </div>

    return <div>
        <button onClick={onUpgrade} className='premium-button'>
            <span className="button-background"></span>
            <span className="button-shine"></span>
            <span className="button-overlay"></span>
            <span className="button-glow"></span>
            <span className="button-content">
                <Sparkles className="sparkle-icon" />
                Upgrade to Pro
            </span>
        </button>
    </div>
}

export default UpgradeBtn;