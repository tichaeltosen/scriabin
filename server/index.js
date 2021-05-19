const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const cv = require('./cv.js');
const spotify = require('./spotify.js');
var scale = require('scale-number-range');


app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(express.json({extended: false}))

app.get('/redirect', (req, res) => {
})

app.post('/image', (req, res) => {
  let img = req.body.img;
  cv.computerVision((colorData) => {
    const {color, accent} = colorData;
    const tempo = Math.floor(scale(accent.l, 0, 1, 120, 50));
    console.log('valence is: ', accent.s);
    console.log('energy is ', accent.s)
    console.log('tempo is: ', tempo)
    let note = Notes[color[0]];
    console.log('note is: ' + color[0] + ' ' + Notes[color[0]]);
    spotify.getTracks((data) => {
      randTrack = Math.floor(Math.random() * data.length);
      let track = data[randTrack].uri;
      let body = {color, track};
      res.status(200).send(body);
    }, note, tempo, accent.s, accent.s)
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
}


