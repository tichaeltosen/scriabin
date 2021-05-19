const SpotifyWebApi = require('spotify-web-api-node');
const config = require('../config/config.js');

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUri: 'http://localhost:3000/redirect'
});

module.exports.getTracks = (callback, key = 0, tempo = 90, energy = .5, valence = .5) => {
  spotifyApi.clientCredentialsGrant().then(
    (data) => {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);

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
    target_energy: energy,
    seed_genres: ['classical'],
    target_key: key,
    min_key: key,
    max_key: key,
    target_tempo: tempo,
    target_valence: valence
  })
    .then((data) => {
      let recommendations = data.body;
      // console.log(recommendations);
      callback(recommendations.tracks)
    }, (err) =>  {
      console.log("Something went wrong!", err);
    });
}
