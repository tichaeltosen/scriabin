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
      let accentHSL = hexToHSL(colors.accentColor);
      let colorInfo = {
        color: colors.dominantColors,
        accent: accentHSL
      }
      callback(colorInfo);
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

const hexToHSL = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  let HSL = new Object();
  HSL['h']=h;
  HSL['s']=s;
  HSL['l']=l;
  return HSL;
}
