import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { proFeatures } from '../../utils/options';
import TabButton from './TabButton';

import img from '../../../assets/images/follow-image.png';
import UpgradeBtn from './UpgradeBtn';

const Dashboard = ({ mainEl }) => {
  const [theme, setTheme] = useState('default');
  const [themeHTML, setThemeHTML] = useState('');


  useEffect(() => {
    setTimeout(() => {
      const defaultTheme = mainEl.querySelector('.templates .default').innerHTML;

      setThemeHTML(defaultTheme);
    }, 500);
  }, []);

  useEffect(() => {
    const defaultTheme = mainEl.querySelector(`.templates .${theme}`).innerHTML;

    setThemeHTML(defaultTheme);
  }, [theme]);

  const premium = mainEl.dataset.isPremium;

  return (
    <Layout>
      <div className="feature-section">
        <div className="feature-container">

          <div>
            {/* Conditionally render content based on premium value */}
            {premium === '1' ? (
              <div className='premium-section'>
                <div className='premium-head-content'>
                  <h1>🎉 Thank you for installing the Premium Version Icon List Block Plugin!</h1>
                </div>
                <div className='premium-follow-image'>
                  <img src={img} alt="" />
                </div>

              </div>
            ) : (
              <div className="feature-grid">

                {/* TabButton Here */}
                <TabButton themeHTML={themeHTML} setThemeHTML={setThemeHTML} mainEl={mainEl} theme={theme} setTheme={setTheme} />

                <div className="feature-content">
                  <p className="section-heading">Awesome Premium Features</p>
                  <p className="section-description">
                    Expand your plugin with some awesome some premium features that will give you a better experience.
                  </p>

                  {/* Premium Feature List */}
                  <div className="feature-list">
                    {proFeatures.map((feature) => (
                      <div key={feature.name} className="feature-item">
                        <div className="feature-name">
                          {feature.name}
                        </div>
                        <div className="feature-description">{feature.description}</div>
                      </div>
                    ))}
                  </div>

                  <UpgradeBtn />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Dashboard;

// const UpgradeBtn = () => {

//   const onUpgrade = (e) => {
//     e.preventDefault();

//     // eslint-disable-next-line no-undef
//     const checkoutConfig = new FS.Checkout({
//       product_id: 17174,
//       plan_id: 28639,
//       public_key: 'pk_51f816736288458da2dd37c719fd3',
//       image: 'https://ps.w.org/icon-list-block/assets/icon-128x128.png?rev=2697392',
//     });

//     checkoutConfig.open({
//       title: 'Icon List Block Pro',
//       licenses: null,
//       // You can consume the response for after purchase logic.
//       // eslint-disable-next-line no-unused-vars
//       purchaseCompleted: (res) => {
//         // The logic here will be executed immediately after the purchase confirmation.
//         // alert(response.user.email);
//       },
//       // eslint-disable-next-line no-unused-vars
//       success: (res) => {
//         // The logic here will be executed after the customer closes the checkout, after a successful purchase.
//         // alert(response.user.email);
//       }
//     });
//     e.preventDefault();
//   }

//   return <div className="upgrade-btn-container">
//     <a className="button button-primary upgrade-btn" onClick={onUpgrade}>🎉 Upgrade to Pro</a>
//   </div>
// }