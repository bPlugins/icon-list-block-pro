import React from 'react';
import Content from '../Parts/Content';
import Header from '../Parts/Header';

const Layout = ({ children, mainEl }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Support', href: '/support' },
  ]

  return (
    <>
      <div className="bplContainer">
        <Header navigation={navigation} mainEl={mainEl} />
        <Content>{children}</Content>
      </div>
    </>
  )
}

export default Layout;