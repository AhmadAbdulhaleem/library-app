import React from 'react';
import Header from '../../components/Header/header';
import Footer from '../../components/Footer/footer';

const Layout = props => {
  return (
    <div>
      <Header user={props.user} />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
