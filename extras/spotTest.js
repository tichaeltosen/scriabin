const cv = require('./cv.js');
const token = 'BQA1pVIda1we6h_-vVgyj4TJ-xn8hQHHfaZ24wK4zFG-QZvfVnC03RApn2mq5gglawtlXk054_63BJLW4vepvilgQp9MdJ8TiNDfdCF5oRFYvlxPLBjyIfoL6s5yrWK9_BpmW-3cUwbVGg';
const test = 'water'
const axios = require('axios');

cv.computerVision((result) => {
  console.log(result);
  let keyword = findMostRepeatedWord(result);
  console.log('keyword is: ' + keyword);
  // getSpotify(keyword);
});

const getSpotify = async (searchTerm) => {
  try {
    const options = {
                method: 'GET',
                url: `https://api.spotify.com/v1/search?q=${searchTerm}&type=playlist`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            }
            const res = await axios(options);
            console.log(res.data.playlists.items[0])
    } catch (err) {
      console.log('error');
    }
  }


const findMostRepeatedWord = (str) => {
  let words = str.match(/\w+/g);
  let occurances = {};
  for (let word of words) {
    if (occurances[word]) {
      occurances[word]++;
    } else {
      occurances[word] = 1;
    }
  }
  let max = 0;
  let mostRepeatedWord = '';
  for (let word of words) {
    if (occurances[word] > max) {
      max = occurances[word];
      mostRepeatedWord = word;
    }
  }
  return mostRepeatedWord;
}