const SpotifyWebApi = require('spotify-web-api-node');
const config = require('../config/config.js');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUri: 'http://localhost:3000/redirect'
});

module.exports.getTracks = (callback, key, tempo, energy, valence) => {
  spotifyApi.clientCredentialsGrant().then(
    (data) => {
      // console.log('The access token expires in ' + data.body['expires_in']);
      // console.log('The access token is ' + data.body['access_token']);
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      getRecs(callback, key, tempo, energy, valence);
    },
    (err) => {
      console.log('Something went wrong when retrieving an access token', err);
    }
  )
}

const getRecs = (callback, key, tempo, energy, valence) => {
  spotifyApi.getRecommendations({
    //testing low energy
    target_energy: energy,
    seed_genres: ['ambient', 'jazz', 'classical'],
    target_key: key,
    min_key: key,
    max_key: key,
    //testing slow tempo
    target_tempo: 50,
    max_tempo: 70,
    target_valence: valence,
    //testing minor
    target_mode: 0,
    max_mode: 0,
    target_danceability: 0,
    target_loudness: 0.2


  })
    .then((data) => {
      let recommendations = data.body;
      callback(recommendations.tracks)
    }, (err) =>  {
      console.log("Something went wrong!", err);
    });
}
