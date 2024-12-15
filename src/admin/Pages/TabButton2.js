import React, { useEffect } from 'react';
import { List } from 'lucide-react';

import './TabButton.scss';

const tabs = [
    { id: 'default', label: 'Default', icon: <List /> },
    { id: 'theme2', label: 'Theme 2', icon: <List /> },
    { id: 'theme3', label: 'Theme 3', icon: <List /> },
    { id: 'theme4', label: 'Theme 4', icon: <List /> },
    { id: 'theme5', label: 'Theme 5', icon: <List /> },
    { id: 'theme6', label: 'Theme 6', icon: <List /> },
    { id: 'theme7', label: 'Theme 7', icon: <List /> },
];

const TabButton2 = ({ mainEl, themeHTML, setThemeHTML, theme, setTheme }) => {

    useEffect(() => {
        // Load the default theme initially
        const defaultTheme = mainEl.querySelector(`.templates .${theme}`)?.innerHTML || '';
        setThemeHTML(defaultTheme);
    }, [theme, mainEl]);

    return (
        <div className="tab-container">
            <nav className="tabs">
                <h2 className='ul-head'>Select Your Theme:</h2>
                <ul className="tab-list">
                    {tabs.map(tab => (
                        <li
                            key={tab.id}
                            className={`tab-item ${theme === tab.id ? 'active' : ''}`}
                            onClick={() => setTheme(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </li>
                    ))}
                </ul>
            </nav>
            <main className="content">
                <h2>{tabs.find(tab => tab.id === theme)?.label} Preview</h2>
                {/* Render the dynamic theme content */}
                <div dangerouslySetInnerHTML={{ __html: themeHTML }} />
            </main>
        </div>
    );
};

export default TabButton2;
