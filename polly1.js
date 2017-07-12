'use strict';

var fs = require('fs');

var AWS = require('aws-sdk')

var exec = require('child_process').exec;


AWS.config.update({ region: 'us-east-1' });

var polly = new AWS.Polly();


var speakParams = {
    OutputFormat: "mp3",
    SampleRate: "8000",
    Text: "Warren Buffett's Berkshire Hathaway Inc (BRKa.N) said on Friday it would pay $9 billion to pick up the parent of Texas power transmission company Oncor Electric Delivery Co from bankruptcy, stepping up its pursuit of steady returns in utilities.",
    TextType: "text",
    VoiceId: "Nicole"
}

polly.synthesizeSpeech(speakParams, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        fs.writeFile('audio.mp3', data.AudioStream, function (err) {
            if (err) {
                console.log('error occured writing file')
            } else {
                exec('afplay audio.mp3', function callback(error, stdout, stderr) {
                    if(error){
                        console.log(error)
                    }
                });
            }
        })
    }
})


