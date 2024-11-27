import React from 'react';
import Layout from '../Layout/Layout';

const Changelog = () => {
  return (
    <Layout>
      <div className="changelog-container">
        <div className="bg-white rounded latest-ver">
          <div className="px-6 py-4 border-b border-b-gray-200 flex justify-between">
            <div className="flex gap-4 items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">v1.0.10</h2>
              <span className="bg-gray-800 px-2.5 py-1 text-white rounded">Latest</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Changelog;