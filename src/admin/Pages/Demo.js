import React from 'react';
import Layout from '../Layout/Layout';
import Gallery from './Gallery';

const Demo = () => {
    return (
        <Layout>
            <div className="demo-section">
                <div className="demo-container">
                    <Gallery />
                </div>
            </div>
        </Layout>
    );
};

export default Demo;