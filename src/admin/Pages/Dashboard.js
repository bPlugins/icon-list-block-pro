import React from 'react';
import Layout from '../Layout/Layout';
import { proFeatures } from '../../utils/options';

const Dashboard = () => {
  return (
    <Layout>
      <div className="feature-section">
        <div className="feature-container">
          <div className="feature-grid">
            <div className="feature-content">
              <h2 className="section-title">Upgrade to pro with</h2>
              <p className="section-heading">Awesome Premium Features</p>
              <p className="section-description">
                Expand your plugin with some awesome some premium features that will give you a better experience.
              </p>
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