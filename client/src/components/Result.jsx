import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Player from './Player';
import Chart from './Chart';
import BackButton from './BackButton';


const Result = ({ track, imageAsUrl, handleShuffle, reset, metrics }) => {
  return (
    <Container className="result-page">
    <Row>
      <Col lg={9}>
        {/* <Button variant="primary" onClick={reset} className="button">Reset</Button> */}
        <BackButton onClick={reset} />
        <div className='art-container'>
          <motion.img
            src={imageAsUrl} alt="art"
            className="art-image"
            whileHover={{
              rotate: [0, 10, -10, 0],
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
            />
        </div>
      </Col>
      <Col lg={3}>
        <h2>Metrics</h2>
        <Chart metrics={metrics}/>
      </Col>
    </Row>
    <Row >
      <Col xs={12}>
        <div className="player-container">
          {track.length ?
          <motion.div
            whileHover={{
              scale: 1.05,
              originX: 0
             }}
            >
            <Button variant="dark" onClick={handleShuffle} className="button">Shuffle</Button>
          </motion.div>
          : <React.Fragment />}
          {track.length ? <Player track={track}/> : <React.Fragment />}
        </div>
      </Col>
    </Row>
    </Container>
  )
}

export default Result;