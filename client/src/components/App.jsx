import React, {useState, useEffect} from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import {storage} from "../firebase/firebase";
import { FileDrop } from 'react-file-drop';
import axios from 'axios';
import Player from './Player';

function App() {
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState('');
  const [track, setTrack] = useState('');
  useEffect(() => {
    if (imageAsUrl.length) {
      axios.post('/image', {
        img: imageAsUrl
      }).then(({ data }) => {
        setTrack(data.track);
      });
    }
  }, [imageAsUrl]);

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    if(imageAsFile === '' ) {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
    uploadTask.on('state_changed',
    (snapShot) => {
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, () => {
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(fireBaseUrl);
       })
    })
  }
  const handleShuffle = () => {
    axios.get('/shuffle').then(({ data }) => {
      setTrack(data);
    })
  }
  const styles = { border: '2px solid black', width: 500, color: 'black', padding: 20 };
  console.log(Spinner);
  return (
    <div>
      <div className='page-one'>
        <div style={styles}>
          <FileDrop
            onDrop={(files, event) => setImageAsFile(files[0])}
          >
            {!imageAsFile ? 'Drag image here!' : 'Ready to analyze!'}
          </FileDrop>
        </div>
        <Form onSubmit={handleFireBaseUpload}>
        <Button variant="outline-primary" type="submit">Analyze</Button>
        </Form>
        </div>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      {track.length ? <button onClick={handleShuffle}>Shuffle</button> : <> </>}
      {imageAsUrl.length ? <img src={imageAsUrl} alt="art"/> : <> </>}
      {track.length ? <Player track={track} /> : <> </>}
    </div>
  );
}
export default App;