
// AOS plugin init
AOS.init();

var titles = [
  'Equipo',
  'Salud y Bienestar',
  'Liderazgo',
  'Fundations',
  'Engagement',
  'Culture del Cambio',
  'Capital humano',
  'Governancia',
  'Eficiencia y agilidad'
];

var questIDs = ["GjZDxIWoitHN", "vHMsURMZG6OH", "jYrB63LOG14O", "Br4ZYLekorFP", "Xhv6eCVDoz72", "wMJmJyPzmQYq", "Q9Opyui1HYXS", "BiNDYgL6pijY", "RQcikfxqnZAM", "hc3VAxHesd6e", "QbWdWlaB6WiB", "oAFijsOTsBSB", "qh2xtO25fFcY", "Vsnk5SUFoes6", "CTq9eh0oGTUS", "A6ng25Gj39Bb", "kfQpbN5VbBsy", "aeWEGlBHNDMS", "shitJPiYNY5u", "H4r9pNIb6nEw", "KhhCWMwoK6jG", "ET5HUcq3sMZL", "n9PZvY4rVe99", "rCIV2QLNt7zc", "hDzFIlUxCBi9", "hTcrVpRYPUfk", "aqmD7IzJfLQf"];

//var colors = ['rgba(132,191,136, 0.3)', 'rgba(255, 241, 175, 0.3)', 'rgba(248, 170, 143, 0.3)'];
//var colors = [chartContext.createPattern(patternCanvas, 'repeat'), 'rgba(255, 241, 175, 0.3)', 'rgba(248, 170, 143, 0.3)'];

var m3qData = [],
    pointsColors = [],
    percentages = [],
    answers = [],
    answersAVG = [],
    labels = [],
    exResponses = [3,3,3,1,1,1,2,2,2,0,0,0,1,2,3,1,1,3,2,2,3,1,1,2,2,2,1];

var $lgStrong = $(".legend-strong"),
    $lgMed = $(".legend-med"),
    $lgLow = $(".legend-low"),
    $lgZero = $(".legend-zero");

var svgItems = ["#equipo","#saludbenestar","#liderzago","#foundations","#engagement","#culturacambio","#capitalhumano","#governancia","#eficiencia"]

function colorPath(el,value) {
    if( value == 3 ){
        $(el).find("#tre, #due, #uno").css('fill', '#8EBE82');
    } else if( value == 2 ){
        $(el).find("#due, #uno").css('fill', '#FFF1B4');
    }  else if( value == 1 ){
        $(el).find("#uno").css('fill', '#F6AF95');
    }
}

function assignColor(value) {
  var color;
  if( value == 3 ){
    color = 'green';
  } else if( value == 2 ){
    color = 'yellow';
  }  else if( value == 1 ){
    color = 'red';
  }
  return color;
}

var chartSize;
var orChartSize = 546;
function resizeChart(array) {
    winW = $(window).width();
    if(winW > 1023){
      chartSize = parseInt(winW)*0.60;
    } else {
      chartSize = parseInt(winW)*0.94;
    }
    $('#chart').width(chartSize);
    $('#chart').height(chartSize);
    $('#chart').css('visibility', 'visible');
}
resizeChart();

function extractValues(array) {
  for(i=0; i<array.length; i++){
    array[i] = parseInt(array[i].split('.')[0]);
  }
  //console.log(array);
  return array;
}

function avarageAnswers(array){
  var sum = 0;
  for(var i=0; i<array.length; i++){
    sum += array[i];
  }
  var avg = Math.round( sum / array.length );
  console.log(avg);
  return avg;
}

function mainChart(array) {
    // Get avarage percentage values
    for( i=0, b=0; i<array.length; i+=3, b++){
        m3qData[b] = Math.round( (array[i]+array[i+1]+array[i+2])/3 );
    }
    //console.log(m3qData);

    for( i=0; i<svgItems.length; i++){
        colorPath(svgItems[i], m3qData[i]);
    }
}

function singleCharts(array) {
    var wBar, elColor;

    // Transform answers in percentage values
    for( i=0; i<array.length; i++){
        wBar = array[i]*33.33;
        elColor = assignColor(array[i]);
        //console.log(wBar + " " + elColor);
        $('.result-value[data-answer="'+(i+1)+'"]').find('.bar').addClass(elColor).width(wBar+"%");
        //$('.result-value[data-answer="'+(i+1)+'"]').attr("title",wBar);
        // console.log(labels[i]);
        // $('.result-value[data-answer="'+(i+1)+'"]').prev('h3').html(labels[i]);
        // console.log($('.result-value[data-answer="'+(i+1)+'"]').prev('h3').html());
        //console.log($('.result-value[data-answer="'+(i+1)+'"]').prev('h3'));
    }

    // Transform answers in percentage values
    //console.log(m3qData);
    for( n=0; n<m3qData.length; n++){
        wBar = m3qData[n]*33.33;
        elColor = assignColor(m3qData[n]);
        $('.result-value[data-groupaverage="'+(n+1)+'"]').find('.bar').addClass(elColor).width(wBar+"%");
        //$('.result-value[data-groupaverage="'+(n+1)+'"]').attr("title",wBar+"%");

        if(elColor == "green") {
            $lgStrong.append("<span>" + titles[n] + "</span> ");
            //console.log(titles[n]);
        } else if(elColor == "yellow") {
            $lgMed.append("<span>" + titles[n] + "</span> ");
        } else if(elColor == "red") {
            $lgLow.append("<span>" + titles[n] + "</span> ");
        } else  {
            $lgZero.append("<span>" + titles[n] + "</span> ");
        }
    }

    //$('[data-toggle="tooltip"]').tooltip();

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getSubmission(email) {
  $.ajax({
    url: "https://api.typeform.com/forms/fepjH3",
    method: "GET",
    headers: {
        "Authorization" : "Bearer " + '7ivycDSoFRWyXAkecThrsuXLKDqYtjBt6FpbrqCtwXmB'
    },
    success: function(response) {
        var label;
        //console.log( response );

        // Parsing JSON for answer values by ID
        for(var n=0; n<questIDs.length; n++) {
            for(var i=0; i<response.fields.length; i++) {
                //console.log(response.items[0].answers[i].field.id);
                if(response.fields[i].id == questIDs[n]){
                    label = response.fields[i].properties.description.substr(1).slice(0, -1);
                    //console.log(label);
                    $('.result-value[data-answer="'+(n+1)+'"]').prev('.result-text').find('h3').html(label);
                    //console.log($('.result-value[data-answer="'+(n+1)+'"]').prev('h3').html());
                }
            }
        }
    }
  });

  $.ajax({
      url: "https://api.typeform.com/forms/fepjH3/responses?query="+email,
      method: "GET",
      headers: {
          "Authorization" : "Bearer " + '7ivycDSoFRWyXAkecThrsuXLKDqYtjBt6FpbrqCtwXmB'
      },
      success: function(response) {
          //var ids = [];
          console.log( response );

          // Parsing JSON for answer values by ID
          for(var n=0; n<questIDs.length; n++) {
            for(var a=0; a<response.items.length; a++) {
              for(var i=0; i<response.items[a].answers.length; i++) {
                //console.log(response.items[0].answers[i].field.id);
                if(response.items[a].answers[i].field.id == questIDs[n]){
                    answers[a] = parseInt(response.items[a].answers[i].choice.label.split('.')[0]);
                }
              }
            }
            console.log( answers );
            answersAVG[n] = avarageAnswers(answers);
          }

          console.log( answersAVG );
          //console.log( response.items[0].answers );
          mainChart(answersAVG);
          singleCharts(answersAVG);
      }
  });
}

var userEmail = getParameterByName('email');
if(userEmail){
    getSubmission(userEmail);
}

// mainChart(exResponses);
// singleCharts(exResponses);


// $(document).ready(function(){
//     'use strict';


// })

function createPDF(){
  $('body').addClass('printpdf');
  $('#chart').width(orChartSize);
  $('#chart').height(orChartSize);

  var element = document.getElementById('m3q');
  var opt = {
    margin:       [0,0.5,0,0.5],
    pagebreak:    { mode: ['legacy'] },
    filename:     'm3q_report-'+userEmail+'.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 1 },
    jsPDF:        { unit: 'in', orientation: 'landscape', compressPDF: true }
  };

  // New Promise-based usage:
  html2pdf().set(opt).from(element).save().then(function(pdf){
    resizeChart();
    $('body').removeClass('printpdf');
  });;
}

$('#pdf-creatiion').click(function(){
  //console.log('test');
  createPDF();

  // Email.send({
  //     SecureToken : "da729942-8dc5-4fcc-90a2-d43a824af356",
  //     To : 'foriaa@gmail.com',
  //     From : "m3q-result@dalmabp.com",
  //     Subject : "This is the subject",
  //     Body : "And this is the body"
  // }).then(
  //   message => alert(message)
  // );
})
