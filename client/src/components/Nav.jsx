import React from 'react';
import { motion } from 'framer-motion';

const Nav = ({ count }) => {
  console.log(count);
  return (
    <div className="header">
    <motion.h1
      className="title"
      initial={{x: -1000}}
      animate={{x: 0}}
      transition={{ duration: 1.5, type: 'spring', bounce: .4 }}
      whileHover={{ scale: 1.1 }}
      >
      Scriabin
    </motion.h1>
    <motion.h3
      className="italic"
      initial={{x: 1000}}
      animate={{x: 0}}
      transition={{ duration: 1.5, type: 'spring', bounce: .4 }}
      whileHover={{ scale: 1.1 }}
      >
      listen to your favorite paintings
    </motion.h3>
  </div>
  )
}

export default Nav;