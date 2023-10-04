import React from 'react';
import './WindArrow.css';

// render the wind direction as an arrow
// the arrow is drawn using CSS
const WindArrow = ({ wind_dir }) => {
  return (
    <div className="arrow" style={{ '--rotation': `${wind_dir}deg` }}></div>
  );
}

export default WindArrow;
