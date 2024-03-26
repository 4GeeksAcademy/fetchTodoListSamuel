import React from 'react';
import Listas from './Listas'; 

const Home = () => {
  const divStyle = {
    backgroundColor: 'lightblue',
    padding: '20px',
  };

  return (
    <div className="home" style={divStyle}>
      <Listas/>
    </div>
  );
};

export default Home; 
