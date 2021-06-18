import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FileDrop } from 'react-file-drop';
import Details from './Details';
const Drag = ({ imageAsFile, setImageAsFile, handleFireBaseUpload, clicked }) => {
  const styles = { border: '2px solid black', width: 500, color: 'black', padding: 20 };
  return (
    <div>
        <div className='drag-file'>
          <div style={styles} className="drop-component">
            <FileDrop
              onDrop={(files, event) => setImageAsFile(files[0])}
            >
            <div className={!imageAsFile ? "drag-text" : "ready-text"}>
                {!imageAsFile ? 'Drag image here!' : 'Ready to analyze!'}
            </div>
            </FileDrop>
          </div>
          <Form onSubmit={handleFireBaseUpload}>
          <Button variant="primary" type="submit" size="lg" disabled={!imageAsFile} className="button">
              {!clicked ? 'Analyze' :
              <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />}
          </Button>
          </Form>
      </div>
      <div className="details">
        <Details />
      </div>
    </div>
  )
}

export default Drag;