const fs = require('fs')
// const ads = require('./ads_list.js')

const images = {
  default: './images/no_cane.jpg',
  suit: './images/suit.jpg',
  pet: './images/pet.jpg',
  cane: './images/cane.jpg',
  jeans: './images/jeans.jpg',
  book: './images/book.jpg'
}

module.exports = function(sum_score, params) {
  console.log(params);

  let rand = Math.random()
  let prob = 0
  let ad = null
  Object.keys(params).forEach(function(key, index) {
    let val = params[key] / sum_score;
    prob += val
    if (ad == null && rand < prob) {
      console.log('identified ' + key + ', showing ' + images[key]);
      ad = images[key]
    } else {
    }
  });
  if (ad == null) {
    ad = images['default']
  }

  return ad
}
