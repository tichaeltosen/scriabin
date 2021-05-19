'use strict';
const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const auth = require('../config/config.js');
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': auth.key } }), auth.endpoint);

module.exports.computerVision = (callback, img) => {
async.series([
  async function () {
    // Analyze URL image
    console.log('Analyzing image for color scheme...', img.split('/').pop());
    console.log();
    const color = (await computerVisionClient.analyzeImage(img, { visualFeatures: ['Color'] })).color;
    printColorScheme(color);
    // Print a detected color scheme
    function printColorScheme(colors) {
      console.log(`Image is in ${colors.isBwImg ? 'black and white' : 'color'}`);
      console.log(`Dominant colors: ${colors.dominantColors.join(', ')}`);
      console.log(`Dominant foreground color: ${colors.dominantColorForeground}`);
      console.log(`Dominant background color: ${colors.dominantColorBackground}`);
      console.log(`Suggested accent color: #${colors.accentColor}`);
      callback(colors.dominantColors);
      }
  },
  function () {
    return new Promise((resolve) => {
      resolve();
    })
  }
], (err) => {
  throw (err);
});
}
