
import React from 'react';
import './Card.css';
const Card = ({
  children,
  className='',
  shadow='medium',
  padding='medium',
  onClick
}) => {
  return (
    <div
      className={`card card-${shadow} card-padding-${padding} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
