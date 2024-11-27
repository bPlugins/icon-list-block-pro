import React from 'react';
import { GoHomeFill } from "react-icons/go";
import HelpfulLinks from '../Pages/HelpfulLinks';
import Content from '../Parts/Content';
import Header from '../Parts/Header';

const SettingsLayout = ({ children }) => {
  const navigation = [
    { name: 'General', href: '/settings' },
    { name: 'Blocks', href: '/block-settings' },
  ]

  const secondaryNav = [
    { name: 'Dashboard', href: '/dashboard', icon: <GoHomeFill /> }
  ]

  return (
    <>
      <div className="bplContainer">
        <Header navigation={navigation} secondaryNav={secondaryNav} />
        <Content>{children}</Content>
        <HelpfulLinks />
      </div>
    </>
  )
}

export default SettingsLayout;