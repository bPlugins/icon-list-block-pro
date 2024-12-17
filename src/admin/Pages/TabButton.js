import React, { useEffect } from 'react';
import { List, CornerLeftDown } from 'lucide-react';

import './TabButton.scss';

const tabs = [
    { id: 'default', label: 'Default', icon: <List />, isPro: false },
    { id: 'theme2', label: 'Theme 2', icon: <List />, isPro: true },
    { id: 'theme3', label: 'Theme 3', icon: <List />, isPro: true },
    { id: 'theme4', label: 'Theme 4', icon: <List />, isPro: true },
    { id: 'theme5', label: 'Theme 5', icon: <List />, isPro: true },
    { id: 'theme6', label: 'Theme 6', icon: <List />, isPro: true },
    { id: 'theme7', label: 'Theme 7', icon: <List />, isPro: true },
];

const TabButton = ({ mainEl, themeHTML, setThemeHTML, theme, setTheme }) => {

    useEffect(() => {
        // Load the default theme initially
        const defaultTheme = mainEl.querySelector(`.templates .${theme}`)?.innerHTML || '';
        setThemeHTML(defaultTheme);
    }, [theme, mainEl]);

    return (
        <div className='tab-section'>
            <div className='dashboard-header-section'>
                <h1>Thank you for installing the <span className='blockName'>Icon List Block Plugin!</span></h1>
                <div className='premium-head'>
                    <CornerLeftDown className='leftDownIcon' />
                    <h3>Check out some of our amazing premium themes below.</h3>
                </div>
                <hr className='divider' />
            </div>
            <div className="tab-container">
                <nav className="tabs">
                    <h2 className='ul-head'>Amazing themes:</h2>
                    <ul className="tab-list">
                        {tabs.map(tab => (
                            <li
                                key={tab.id}
                                className={`tab-item ${theme === tab.id ? 'active' : ''}`}
                                onClick={() => setTheme(tab.id)}
                            >
                                <div className="tab-content">
                                    {tab.icon}
                                    <span className="tab-label">{tab.label}</span>
                                    {tab.isPro && <span className="pro-badge">Pro</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
                <main className="content">
                    <h3>{tabs.find(tab => tab.id === theme)?.label} Preview</h3>
                    {/* Render the dynamic theme content */}
                    <div dangerouslySetInnerHTML={{ __html: themeHTML }} />
                </main>
            </div>
        </div>
    );
};

export default TabButton;
