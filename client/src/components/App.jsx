import React, {useState, useEffect} from 'react';
import {storage} from "../firebase/firebase";
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

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }
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
  return (
    <div>
    <form onSubmit={handleFireBaseUpload}>
        <input
          type="file"
          onChange={handleImageAsFile}
        />
        <button>upload to firebase</button>
      </form>
      <button onClick={handleShuffle}>Shuffle</button>
      <img src={imageAsUrl} alt="image tag" />
      {track.length && <Player track={track} />}
    </div>
  );
}

export default App;