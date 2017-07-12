'use strict'

var AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' });

var lexruntime = new AWS.LexRuntime()

var params = {
  botAlias: 'BuyInsurance', /* required */
  botName: 'simpleBot', /* required */
  inputText: 'Can you help me with insurance', /* required */
  userId: 'prabhat', /* required */
//   sessionAttributes: {
//     '<String>': 'STRING_VALUE',
//     /* '<String>': ... */
//   }
};
lexruntime.postText(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});