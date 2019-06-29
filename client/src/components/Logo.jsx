import React from 'react';

const logoImage = {
  width: '80px'
};

const Logo = props => {
  return (
    <div>
      <img style={logoImage} className="logo" src="../pair_on_logo.png"
        />
      <h2>Meet people. <br/>Explore the city.</h2>
    </div>
  );
};

export default Logo;