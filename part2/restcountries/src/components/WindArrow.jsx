import React from 'react';
import './WindArrow.css';

const WindArrow = ({ wind_dir }) => {
  return (
    <div className="arrow" style={{ '--rotation': `${wind_dir}deg` }}></div>
  );
}

export default WindArrow;
