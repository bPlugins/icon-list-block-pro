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