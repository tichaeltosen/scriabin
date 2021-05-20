import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Metric = () => {
  const color = 'Blue';
  const style = {color, fontSize: '2rem'};
  return (
    <div className="metrics">
      <div className="metric">
        <CircularProgressbarWithChildren value={66}>
          <img style={{ width: 40, marginTop: -5 }} src="/emotions.png" alt="emo" />
          <div style={{ fontSize: 12, marginTop: -5 }}>
            <strong>66%</strong> happy
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className="metric">
      <CircularProgressbarWithChildren value={66}>
        <img style={{ width: 40, marginTop: -5 }} src="/flash.png" alt="doge" />
        <div style={{ fontSize: 12, marginTop: -5 }}>
          <strong>66%</strong> energy
        </div>
      </CircularProgressbarWithChildren>
    </div>
    <span>
      <p>The dominant color is: </p>
      <p style={style}><strong>{color}</strong></p>
    </span>
    </div>
  )
}

export default Metric;
