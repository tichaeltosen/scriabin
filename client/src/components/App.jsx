import React, {useState, useEffect} from 'react';
import {storage} from "../firebase/firebase";
import axios from 'axios';

function App() {
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState('');
  useEffect(() => {
    if (imageAsUrl.length) {
      axios.post('/image', {
        img: imageAsUrl
      }).then((res) => console.log(res));
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

  return (
    <div className="App">
    <form onSubmit={handleFireBaseUpload}>
        <input
          type="file"
          onChange={handleImageAsFile}
        />
        <button>upload to firebase</button>
      </form>
      <img src={imageAsUrl} alt="image tag" />
    </div>
  );
}

export default App;