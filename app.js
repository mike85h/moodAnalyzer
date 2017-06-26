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

var params = {
  text: encodedInput,
  tones: 'emotion'
};

tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else
    // resultStr = JSON.stringify(response, null, 2);
    // console.log(JSON.stringify(response, null, 2));
    var tone1=response.document_tone.tone_categories["0"].tones["0"].tone_name;
    var tone1Num=response.document_tone.tone_categories["0"].tones["0"].score;

    var tone2=response.document_tone.tone_categories["0"].tones[1].tone_name;
    var tone2Num=response.document_tone.tone_categories["0"].tones[1].score;

    var tone3=response.document_tone.tone_categories["0"].tones[2].tone_name;
    var tone3Num=response.document_tone.tone_categories["0"].tones[2].score;

    var tone4=response.document_tone.tone_categories["0"].tones[3].tone_name;
    var tone4Num=response.document_tone.tone_categories["0"].tones[3].score;

    var tone5=response.document_tone.tone_categories["0"].tones[4].tone_name;
    var tone5Num=response.document_tone.tone_categories["0"].tones[4].score;

    resultStr  = (tone1 + " " + tone1Num + "<br>");
    resultStr += (tone2 + " " + tone2Num + "<br>");
    resultStr += (tone3 + " " + tone3Num + "<br>");
    resultStr += (tone4 + " " + tone4Num + "<br>");
    resultStr += (tone5 + " " + tone5Num + "<br>");


    if ( $('.responseText').children().length > 0 ) {
      $('.result').remove();
      $('.responseText').append("<p class='text-center result'>" + resultStr + "</p>");
    }else{
      $('.responseText').append("<p class='text-center result'>" + resultStr + "</p>");
    }

    });
});
