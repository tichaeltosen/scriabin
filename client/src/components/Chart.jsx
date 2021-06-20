import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { motion } from 'framer-motion';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Metric = ({ metrics }) => {
  console.log(metrics);
  const color = metrics.color;
  const style = {color, fontSize: '2rem'};
  return (
    <div className="metrics">
      <motion.div
        className="metric"
        whileHover={{
              rotate: [0, 360],
              filter: [
                'hue-rotate(0) contrast(100%)',
                'hue-rotate(360deg) contrast(200%)',
                'hue-rotate(45deg) contrast(300%)',
                'hue-rotate(0) contrast(100%)',
              ],
              transition: {
                duration: .8
              }
             }}
      >
        <CircularProgressbarWithChildren value={metrics.valence * 100}>
          <img style={{ width: 40, marginTop: -5 }} src="/emotions.png" alt="emo" />
          <div style={{ fontSize: 12, marginTop: -5 }}>
            <strong>{metrics.valence * 100} % </strong> happy
          </div>
        </CircularProgressbarWithChildren>
      </motion.div>
      <motion.div
        className="metric"
        whileHover={{
              rotate: [0, 360],
              filter: [
                'hue-rotate(0) contrast(100%)',
                'hue-rotate(360deg) contrast(200%)',
                'hue-rotate(45deg) contrast(300%)',
                'hue-rotate(0) contrast(100%)',
              ],
              transition: {
                duration: .8
              }
             }}
      >
      <CircularProgressbarWithChildren value={metrics.energy * 100}>
        <img style={{ width: 40, marginTop: -5 }} src="/flash.png" alt="doge" />
        <div style={{ fontSize: 12, marginTop: -5 }}>
          <strong>{metrics.energy * 100} % </strong> energy
        </div>
      </CircularProgressbarWithChildren>
    </motion.div>
    <span>
      <p>The dominant color is: </p>
      <motion.p
        style={style}
      >
        <strong>{color}</strong>
      </motion.p>
    </span>
    </div>
  )
}

export default Metric;

