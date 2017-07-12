'use strict'

var AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1'
})

var rekognition = new AWS.Rekognition()

var params = {
  Image: { /* required */
    // Bytes: new Buffer('...') || 'STRING_VALUE',
    S3Object: {
      Bucket: 'prabhat-sample-photos',
      Name: 'holi_girl.jpg',
    //   Version: '1'
    }
  },
  MaxLabels: 10,
  MinConfidence: 0.0
};
rekognition.detectLabels(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});