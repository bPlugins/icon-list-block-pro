import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { proFeatures } from '../../utils/options';
import TabButton from './TabButton';

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

  return (
    <Layout>
      <div className="feature-section">
        <div className="feature-container">
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

              <div className="upgrade-btn-container">
                <a href="https://bplugins.com/plugins/advance-custom-html/upgrade-to-pro" target="_blank" rel="noopener noreferrer" className="button button-primary upgrade-btn">Upgrade to Pro</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;