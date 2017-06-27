//created by Michael Harrington June 2017
var unique = require('uniq');
var encodedInput = "";
var emotionResultStr = "";
var languageResultStr = "";
var socialResultStr = "";

$('#mainButton').click(function(){
  var input = $('#mainInput').val();
  encodedInput = encodeURI(input);
  encodedInput = '"' + encodedInput + '"'



var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3.js');
var tone_analyzer = new ToneAnalyzerV3({
  username: "d9eebd1b-b1a9-4cd9-94e3-714537281c54",
  password: "O7yKSnOt2zIM",
  version_date: '2016-05-19'
});

var params = {
  text: encodedInput;
};

tone_analyzer.tone(params, function(error, response) {
  if (error)
    console.log('error:', error);
  else

    //emotional tones:
    var emTone1=response.document_tone.tone_categories["0"].tones["0"].tone_name;
    var emTone1Num=response.document_tone.tone_categories["0"].tones["0"].score;

    var emTone2=response.document_tone.tone_categories["0"].tones[1].tone_name;
    var emTone2Num=response.document_tone.tone_categories["0"].tones[1].score;

    var emTone3=response.document_tone.tone_categories["0"].tones[2].tone_name;
    var emTone3Num=response.document_tone.tone_categories["0"].tones[2].score;


    var emTone4=response.document_tone.tone_categories["0"].tones[3].tone_name;
    var emTone4Num=response.document_tone.tone_categories["0"].tones[3].score;

    var emTone5=response.document_tone.tone_categories["0"].tones[4].tone_name;
    var emTone5Num=response.document_tone.tone_categories["0"].tones[4].score;

    emotionResultStr  = (emTone1 + ": " + emTone1Num + "<br>");
    emotionResultStr += (emTone2 + ": " + emTone2Num + "<br>");
    emotionResultStr += (emTone3 + ": " + emTone3Num + "<br>");
    emotionResultStr += (emTone4 + ": " + emTone4Num + "<br>");
    emotionResultStr += (emTone5 + ": " + emTone5Num + "<br>");

    //language tones:
    var lanTone1 = .document_tone.tone_categories[1].tones["0"].tone_name;
    var lanTone1Num = .document_tone.tone_categories[1].tones["0"].score;

    var lanTone2 = .document_tone.tone_categories[1].tones[1].tone_name;
    var lanToneNum2 = .document_tone.tone_categories[1].tones[1].score;

    var lanTone3 = .document_tone.tone_categories[1].tones[2].tone_name;
    var lanToneNum3 = .document_tone.tone_categories[1].tones[2].tone_name;

    lanugageResultStr  = (lanTone1 + ": " + lanTone1Num + "<br>");
    languageResultStr += (lanTone2 + ": " + lanTone2Num + "<br>");
    languageResultStr += (lanTone3 + ": " + lanTone3Num + "<br>");

    //social tones:

    var socTone1 = .document_tone.tone_categories[2].tones["0"].tone_name;
    var socTone1Num = .document_tone.tone_categories[2].tones["0"].score;

    var socTone2 = .document_tone.tone_categories[2].tones[1].tone_name;
    var socTone2Num = .document_tone.tone_categories[2].tones[1].score;

    var socTone3 = .document_tone.tone_categories[2].tones[2].tone_name;
    var socTone3Num = .document_tone.tone_categories[2].tones[2].score;

    var socTone4 = .document_tone.tone_categories[2].tones[3].tone_name;
    var socTone4Num = .document_tone.tone_categories[2].tones[3].score;

    var socTone5 = .document_tone.tone_categories[2].tones[4].tone_name;
    var socTone5Num = .document_tone.tone_categories[2].tones[4].score;

    socialResultStr  = (socTone1 + ": " + socTone1Num + "<br>");
    socialResultStr += (socTone2 + ": " + socTone2Num + "<br>");
    socialResultStr += (socTone3 + ": " + socTone3Num + "<br>");
    socialResultStr += (socTone4 + ": " + socTone4Num + "<br>");
    socialResultStr += (socTone5 + ": " + socTone5Num + "<br>");


    if ( $('.responseText').children().length > 0 ) {
      $('.result').remove();
      $('.responseText').append("<p class='text-center result' id='emResult'>" + emotionResultStr + "</p>");
      $('.responseText').append("<p class='text-center result' id='lanResult'>" + languageResultStr + "</p>");
      $('.responseText').append("<p class='text-center result' id='socResult'>" + socialResultStr + "</p>");
    }else{
      $('.responseText').append("<p class='text-center result' id='emResult'>" + emotionResultStr + "</p>");
      $('.responseText').append("<p class='text-center result' id='lanResult'>" + languageResultStr + "</p>");
      $('.responseText').append("<p class='text-center result' id='socResult'>" + socialResultStr + "</p>");
    }

    });
});
