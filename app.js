//created by Michael Harrington June 2017
var unique = require('uniq');
var encodedInput = "";

$("document").ready(function() {
  $('#mainButton').click(function(){
    var input = $('#mainInput').val();
    encodedInput = encodeURI(input);
    encodedInput = '"' + encodedInput + '"';

    $('.responseText').empty();

    var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3.js');
    var tone_analyzer = new ToneAnalyzerV3({
      username: "d9eebd1b-b1a9-4cd9-94e3-714537281c54",
      password: "O7yKSnOt2zIM",
      version_date: '2016-05-19'
    });

    var params = {
      text: encodedInput
    };

    tone_analyzer.tone(params, function(error, response) {
      if (error)
        console.log('error:', error);
      else
        //emotional tones:
        var emotionResultStr = "";
        var emTone1 = response.document_tone.tone_categories[0].tones[0].tone_name;
        var emTone1Num = 100*(response.document_tone.tone_categories[0].tones[0].score);

        var emTone2 = response.document_tone.tone_categories[0].tones[1].tone_name;
        var emTone2Num = 100*(response.document_tone.tone_categories[0].tones[1].score);

        var emTone3 = response.document_tone.tone_categories[0].tones[2].tone_name;
        var emTone3Num = 100*(response.document_tone.tone_categories[0].tones[2].score);

        var emTone4 = response.document_tone.tone_categories[0].tones[3].tone_name;
        var emTone4Num = 100*(response.document_tone.tone_categories[0].tones[3].score);

        var emTone5 = response.document_tone.tone_categories[0].tones[4].tone_name;
        var emTone5Num = 100*(response.document_tone.tone_categories[0].tones[4].score);

        emotionResultStr += (emTone1 + ": " + emTone1Num + "<br>");
        emotionResultStr += (emTone2 + ": " + emTone2Num + "<br>");
        emotionResultStr += (emTone3 + ": " + emTone3Num + "<br>");
        emotionResultStr += (emTone4 + ": " + emTone4Num + "<br>");
        emotionResultStr += (emTone5 + ": " + emTone5Num + "<br>");

        //language tones:
        var languageResultStr = "";
        var lanTone1 = response.document_tone.tone_categories[1].tones[0].tone_name;
        var lanTone1Num = 100*(response.document_tone.tone_categories[1].tones[0].score);

        var lanTone2 = response.document_tone.tone_categories[1].tones[1].tone_name;
        var lanTone2Num = 100*(response.document_tone.tone_categories[1].tones[1].score);

        var lanTone3 = response.document_tone.tone_categories[1].tones[2].tone_name;
        var lanTone3Num = 100*(response.document_tone.tone_categories[1].tones[2].score);

        languageResultStr += (lanTone1 + ": " + lanTone1Num + "<br>");
        languageResultStr += (lanTone2 + ": " + lanTone2Num + "<br>");
        languageResultStr += (lanTone3 + ": " + lanTone3Num + "<br>");

        //social tones:
        var socialResultStr = "";
        var socTone1 = response.document_tone.tone_categories[2].tones[0].tone_name;
        var socTone1Num = 100*(response.document_tone.tone_categories[2].tones[0].score);

        var socTone2 = response.document_tone.tone_categories[2].tones[1].tone_name;
        var socTone2Num = 100*(response.document_tone.tone_categories[2].tones[1].score);

        var socTone3 = response.document_tone.tone_categories[2].tones[2].tone_name;
        var socTone3Num = 100*(response.document_tone.tone_categories[2].tones[2].score);

        var socTone4 = response.document_tone.tone_categories[2].tones[3].tone_name;
        var socTone4Num = 100*(response.document_tone.tone_categories[2].tones[3].score);

        var socTone5 = response.document_tone.tone_categories[2].tones[4].tone_name;
        var socTone5Num = 100*(response.document_tone.tone_categories[2].tones[4].score);

        socialResultStr += (socTone1 + ": " + socTone1Num + "<br>");
        socialResultStr += (socTone2 + ": " + socTone2Num + "<br>");
        socialResultStr += (socTone3 + ": " + socTone3Num + "<br>");
        socialResultStr += (socTone4 + ": " + socTone4Num + "<br>");
        socialResultStr += (socTone5 + ": " + socTone5Num + "<br>");

        $('.navbar-fixed-bottom').addClass('navbar-bottom').removeClass('navbar-fixed-bottom');

        $('.responseText').append("<h2 class= 'text-center'>Results:</h2>")
        $('.responseText').append("<h3 class= 'text-center'>*Note: Scores over 75 mean the metric is very likely meant/perceived. Scores under 50 mean the metric is unlikely present.</h3>");
          $('.responseText').append("<div class= 'container outsideWrapper'></div>");
            $('.outsideWrapper').append("<div class= 'resultBox row'></div>");
              $('.resultBox').append("<div class= 'col-md-6 emResultColumn'></div>");
                $('.emResultColumn').append("<h3>Emotion</h3>");
                $('.emResultColumn').append("<p class= 'text-center' id= 'emResult'>" + emotionResultStr + "</p>");
              // $('.resultBox').append("<div class='col-md-4 lanResultColumn'></div>");
              //   $('.lanResultColumn').append("<h3>Language</h3>");
              //   $('.lanResultColumn').append("<p class='text-center' id='lanResult'>" + languageResultStr + "</p>");
              $('.resultBox').append("<div class='col-md-6 socResultColumn'></div>");
                $('.socResultColumn').append("<h3>Social</h3>");
                $('.socResultColumn').append("<p class='text-center' id='socResult'>" + socialResultStr + "</p>");


        //em chart
        var ctx = document.getElementById("emChart").getContext('2d');
        var emChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: [emTone1, emTone2, emTone3, emTone4, emTone5],
              datasets: [{
                // label: 'Emotional',
                data: [emTone1Num, emTone2Num, emTone3Num, emTone4Num, emTone5Num],
                backgroundColor: [
                  'Red',
                  'Saddlebrown',
                  'Yellow',
                  'Green',
                  'Purple',
                ],
                borderColor: [
                  'Red',
                  'Saddlebrown',
                  'Yellow',
                  'Green',
                  'Purple',
                ],
                  borderWidth: 0
              }]
            },
            options: {
              legend: {
                display:false
              },
              title: {
                display: true,
                text: 'Emotional Tones'
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero:true,
                      min:0,
                      max:100
                  }
                }]
              }
            }
          });

      //lang chart
    //   var ctx = document.getElementById("langChart").getContext('2d');
    //   var myChart = new Chart(ctx, {
    //       type: 'bar',
    //       data: {
    //         labels: [lanTone1, lanTone2 ,lanTone3 ],
    //         datasets: [{
    //           label: 'Language',
    //           data: [lanTone1Num, lanTone2Num, lanTone3],
    //           backgroundColor: [
    //             'Red',
    //             'Green',
    //             'Blue'
    //           ],
    //           borderColor: [
    //             'Red',
    //             'Green',
    //             'Blue'
    //           ],
    //             borderWidth: 0
    //         }]
    //       },
    //       options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                   beginAtZero:true,
    //                   min:0,
    //                   max:100
    //                 }
    //             }]
    //         }
    //     }
    // });

    // soc chart
    var ctx = document.getElementById("socChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: [socTone1, socTone2, socTone3, socTone4, socTone5],
          datasets: [{
            // showlabel: '',
            data: [socTone1Num, socTone2Num, socTone3Num, socTone4Num, socTone5Num],
            backgroundColor: [
              'Red',
              'Blue',
              'Green',
              'Yellow',
              'Purple'
            ],
            borderColor: [
              'Red',
              'Blue',
              'Green',
              'Yellow',
              'Purple'
            ],
              borderWidth: 0
          }]
        },
        options: {
          legend: {
            display:false
          },
          title: {
            display: true,
            text: 'Social Tones'
          },
          scales: {
              xAxes: [{
                  ticks: {
                    beginAtZero:true,
                    min:0,
                    max:100
                  }
              }]
          }
      }
  });
//end chart

    });
  });
});
