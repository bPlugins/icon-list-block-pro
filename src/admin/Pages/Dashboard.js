import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { proFeatures } from '../../utils/options';
import TabButton2 from './TabButton2';

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
            {/* <TabButton theme={theme} setTheme={setTheme} /> */}
            <TabButton2 themeHTML={themeHTML} setThemeHTML={setThemeHTML} mainEl={mainEl} theme={theme} setTheme={setTheme} />

            {/* Demo section */}
            {/* <div className='icon-demo-section'>
              <h2>View Themes Here</h2>
              <div className="icon-demo-container">
                <div dangerouslySetInnerHTML={{ __html: themeHTML }}>
                </div>
                <SelectControl className="iconSelect" label='Select Theme' labelPosition='left' value={theme} onChange={val => setTheme(val)} options={[
                  { label: 'Default', value: 'default' },
                  { label: 'Theme 2', value: 'theme2' },
                  { label: 'Theme 3', value: 'theme3' },
                  { label: 'Theme 4', value: 'theme4' },
                  { label: 'Theme 5', value: 'theme5' },
                  { label: 'Theme 6', value: 'theme6' },
                  { label: 'Theme 7', value: 'theme7' },
                ]} />
              </div>
            </div> */}

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