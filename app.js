//created by Michael Harrington
//encodeURI("string here"); will output string of type needed by watson
var unique = require('uniq');

var encodedInput = "";

$('#mainButton').click(function(){
  var input = $('#mainInput').val();
  encodedInput = encodeURI(input);
  encodedInput = '"' + encodedInput + '"'
  // console.log(encodedInput);

// {
//   "url": "https://gateway.watsonplatform.net/tone-analyzer/api",
//   "username": "aa44c815-f9e5-45ec-9862-86133587c17a",
//   "password": "Zzgmqx7IQjf8"
// }

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3.js');
var tone_analyzer = new ToneAnalyzerV3({
  username: "d9eebd1b-b1a9-4cd9-94e3-714537281c54",
  password: "O7yKSnOt2zIM",
  version_date: '2016-05-19'
});

// console.log(encodedInput);
var params = {
  text: encodedInput,
  tones: 'emotion'
};

var resultObj;

tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    resultStr = JSON.stringify(response, null, 2);
    // console.log(JSON.stringify(response, null, 2));
    resultObj = response;
    // console.log(response);
    // console.log(resultObj.document_tone.tone_categories["0"].tones[1].score)
    if ( $('.responseText').children().length > 0 ) {
      $('.result').remove();
      
      $('.responseText').append("<p class='text-center result'>" + resultStr + "</p>");
    }else{
      $('.responseText').append("<p class='text-center result'>" + resultStr + "</p>");
    }
    });
});
