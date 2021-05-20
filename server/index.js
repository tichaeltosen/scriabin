const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const cv = require('./cv.js');
const spotify = require('./spotify.js');
const scale = require('scale-number-range');
let currentTracks = [];

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

app.get('/redirect', (req, res) => {
})

app.get('/shuffle', (req, res) => {
  let track = pickRandomTrack(currentTracks).uri;
  res.status(200).send(track);
})

app.post('/image', (req, res) => {
  let img = req.body.img;
  cv.computerVision((colorData) => {
    const {color, accent} = colorData;
    const tempo = Math.floor(scale(accent.s, 0, 1, 50, 130));
    const energy = scale(accent.h, 0, 1, 1, 0).toFixed(2);
    const valence = accent.s.toFixed(2);
    console.log('valence is: ', valence);
    console.log('energy is ', energy)
    console.log('tempo is: ', tempo)
    let note = Notes[color[0]];
    console.log('note is: ' + color[0] + ' ' + Notes[color[0]]);
    spotify.getTracks((data) => {
      currentTracks = data;
      let track = pickRandomTrack(data).uri;
      let body = {color, track, energy, valence};
      res.status(200).send(body);
    }, note, tempo, energy, valence)
  }, img)
})

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const Notes = {
  'Red': 1,
  'Violet': 2,
  'Yellow': 3,
  'Grey': 4,
  'White': 5,
  'Brown': 6,
  'Blue': 7,
  'Orange': 8,
  'Purple': 9,
  'Green': 10,
  'Silver': 11,
  'Teal': 12,
  'Black': 6
}

const pickRandomTrack = (arr) => {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
