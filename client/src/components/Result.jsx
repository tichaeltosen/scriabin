import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import Player from './Player';
import Chart from './Chart'


const Result = ({ track, imageAsUrl, handleShuffle, reset }) => {
  return (
    <Container className="result-page">
    <Row>
      <Col lg={9}>
        <Button variant="primary" onClick={reset} className="button">Reset</Button>
        <div className='art-container'>
          <img src={imageAsUrl} alt="art" className="art-image"/>
        </div>
      </Col>
      <Col lg={3}>
        <h2>Metrics</h2>
        <Chart />
      </Col>
    </Row>
    <Row >
      <Col xs={12}>
        <div className="player-container">
          {track.length ? <Button variant="dark" onClick={handleShuffle} className="button">Shuffle</Button> : <React.Fragment />}
          {track.length ? <Player track={track}/> : <React.Fragment />}
        </div>
      </Col>
    </Row>
    </Container>
  )
}

export default Result;