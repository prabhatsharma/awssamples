'use strict';

var AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

var kinesis = new AWS.Kinesis();


kinesis.endpoint = 'https://kinesis.us-east-1.amazonaws.com';

var streamdata = {
    key1: "value2"
}

var putParams = {
    Records: [
        {
            Data: new Buffer(JSON.stringify(streamdata)).toString('base64'),
            PartitionKey: "parkey1"
        }
    ],
    StreamName: "kstream1"
}

kinesis.putRecords(putParams, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})


// var describeParams = {
//     StreamName: 'kstream1'
// }

// kinesis.describeStream(describeParams, function(err, describeData){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(describeData)
//     }
// })

var iteratorParams = {
    ShardId: 'shardId-000000000001', /* required */
    ShardIteratorType: 'AFTER_SEQUENCE_NUMBER', /* required */
    StreamName: 'kstream1', /* required */
    StartingSequenceNumber: '49574820700316204691532598933771159960222830634670751762',
    //   Timestamp: new Date || 'Wed Dec 31 1969 16:00:00 GMT-0800 (PST)' || 123456789
};
kinesis.getShardIterator(iteratorParams, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        var getParams = {
            ShardIterator: data.ShardIterator
        };
        console.log('shardIterator is:', data.ShardIterator)

        kinesis.getRecords(getParams, function (err, recordData) {
            if (err) {
                console.log(err)
            } else {
                for (var k=0;k<recordData.Records.length;k++){
                    recordData.Records[k].Data = new Buffer(new Buffer(recordData.Records[k].Data, 'base64').toString(), 'base64').toString();
                }
                console.log(recordData)
            }
        })
    }             // successful response
});



