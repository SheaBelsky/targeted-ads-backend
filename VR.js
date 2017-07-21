const fs = require('fs');
const recommender = require('./recommender.js')

// import credentials file
const credentials = require('./credentials.json')

// import Watson services
const watson = require('watson-developer-cloud');
const visual_recognition = new watson.visual_recognition({
  api_key: credentials.VR.api_key,
  version: credentials.VR.version,
  version_date: credentials.VR.version_date
});

module.exports = function(app, multer) {
  app.post('/classify', multer.single('displayImage'), function(request, response, next) {
    console.log(request.file);
    visual_recognition.classify({
        images_file: fs.createReadStream(request.file.path),
        // classifier_id: 'Cane_1985207586'
      }, function(error, result){
        console.log(JSON.stringify(result));
        if (error) {
          console.log('Error! ' + error);
          return
        } //else
        let params = {
          pets: 0, cane: 0, suit: 0, jeans: 0, book: 0
        }
        let sum_score = 0
        for (let i=0; i < result.images[0].classifiers[0].classes.length; i++) {
          switch (result.images[0].classifiers[0].classes[i].class) {
            case 'domestic animal':
              params.pet = result.images[0].classifiers[0].classes[i].score
              sum_score += result.images[0].classifiers[0].classes[i].score
              break;
            case 'walking stick':
              params.cane = result.images[0].classifiers[0].classes[i].score
              sum_score += result.images[0].classifiers[0].classes[i].score
              break;
            case 'suit':
              params.suit = result.images[0].classifiers[0].classes[i].score
              sum_score += result.images[0].classifiers[0].classes[i].score
              break;
            case 'jeans':
              params.jeans = result.images[0].classifiers[0].classes[i].score
              sum_score += result.images[0].classifiers[0].classes[i].score
              break;
            case 'book':
              params.book = result.images[0].classifiers[0].classes[i].score
              sum_score += result.images[0].classifiers[0].classes[i].score
              break;
          }
        }
        fs.createReadStream(recommender(sum_score, params)).pipe(response)
        // return response.json(result)
        return
      }
    )
  })
}
