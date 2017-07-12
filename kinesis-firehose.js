'use strict';

var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

var firehose = new AWS.Firehose();

firehose.endpoint = 'https://firehose.us-east-1.amazonaws.com';

var streamdata = {
    key2: "value2"
}

var putParams = {
  DeliveryStreamName: 'kfstream1', /* required */
  Record: { /* required */
    Data: JSON.stringify(streamdata)  /* required */
  }
};
firehose.putRecord(putParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
