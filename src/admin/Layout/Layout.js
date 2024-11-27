import React from 'react';
import HelpfulLinks from '../Pages/HelpfulLinks';
import Content from '../Parts/Content';
import Header from '../Parts/Header';
import { IoIosSettings } from "react-icons/io";

const Layout = ({ children }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Changelog', href: '/changelog' },
  ]

  const secondaryNav = [
    { name: 'Settings', href: '/settings', icon: <IoIosSettings /> }
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

export default Layout;