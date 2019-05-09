import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '20px', background: '#c5c5c5' }}>
      <p
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          marginTop: '20px',
        }}
      >
        &copy; 2019 Library Company, Inc
      </p>
    </footer>
  );
};

export default Footer;
