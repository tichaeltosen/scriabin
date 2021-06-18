import React, {useState, useEffect} from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import {storage} from "../firebase/firebase";
import { motion } from 'framer-motion';
import { FileDrop } from 'react-file-drop';
import $ from 'jquery';
import axios from 'axios';
import Drag from './Drag';
import Result from './Result';


function App() {
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState('');
  const [track, setTrack] = useState('');
  const [clicked, setClicked] = useState(false);
  const [metrics, setMetrics] = useState({
    color: '',
    valence: 0,
    energy: 0
  })

  useEffect(() => {
    if (imageAsUrl.length) {
      axios.post('/image', {
        img: imageAsUrl
      }).then(({ data }) => {
        setMetrics({
          color: data.color[0],
          valence: data.valence,
          energy: data.energy
        });
        setTrack(data.track);
      });
    }
  }, [imageAsUrl]);

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    setClicked(true);
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
         setClicked(false);
       })
    })
  }
  const handleShuffle = () => {
    axios.get('/shuffle').then(({ data }) => {
      setTrack(data);
    })
  }

  const reset = () => {
    setImageAsFile('');
    setImageAsUrl('');
    setTrack('');
  }
  return (
    <div onMouseMove={(e) => {
      const mouseX = Math.round(e.pageX / window.innerWidth * 100);
      const mouseY = Math.round(e.pageY / window.innerHeight * 100);
      console.log(mouseX, mouseY);
      $('body').css('background', 'radial-gradient(at ' + mouseX + '% ' + mouseY + '%, #e3ffe7, #b9d1fc)');
    }}>
      <div className="header">
        {/* <h1 className="title">Scriabin</h1> */}
        <motion.h1
          className="title"
          initial={{x: -1000}}
          animate={{x: 20}}
          transition={{ duration: 1.5, type: 'spring', bounce: .4 }}
          >
          Scriabin
        </motion.h1>
        <motion.h3
          className="italic"
          initial={{x: 1000}}
          animate={{x: 20}}
          transition={{ duration: 1.5, type: 'spring', bounce: .4 }}
          >
          listen to your favorite paintings
        </motion.h3>
      </div>
      <div>
        {!imageAsUrl && <Drag imageAsFile={imageAsFile} setImageAsFile={setImageAsFile}
        handleFireBaseUpload={handleFireBaseUpload} clicked={clicked}/>}
        {imageAsUrl && <Result track={track} imageAsUrl={imageAsUrl}
        handleShuffle={handleShuffle} reset={reset} metrics={metrics}/>}
      </div>
    </div>
  );
}
export default App;