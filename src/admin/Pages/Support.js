import React from 'react';
import Layout from '../Layout/Layout';
import HelpfulLinks from './HelpfulLinks';

const Support = () => {
    return (
        <Layout>
            <div className='support-section'>
                <div className='support-container'>
                    <HelpfulLinks />
                </div>
            </div>
        </Layout>
    );
};

export default Support;