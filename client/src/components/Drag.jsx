import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FileDrop } from 'react-file-drop';

const Drag = ({ imageAsFile, setImageAsFile, handleFireBaseUpload, clicked }) => {
  const styles = { border: '2px solid black', width: 500, color: 'black', padding: 20 };
  return (
    <div className='drag-file'>
      <div style={styles}>
        <FileDrop
          onDrop={(files, event) => setImageAsFile(files[0])}
        >
          {!imageAsFile ? 'Drag image here!' : 'Ready to analyze!'}
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
  )
}

export default Drag;