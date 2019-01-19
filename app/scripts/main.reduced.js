// Get the context of the canvas element we want to select
// var ctx = document.getElementById("mainchart").getContext("2d");

// function arcDrawLines(){
//     ctx.beginPath();
//     ctx.arc(scale.xCenter, scale.yCenter, radius, 0, Math.PI * 2);
//     ctx.closePath();
//     ctx.stroke();
// }

// var dots = new Image();
// dots.style.background = '#000000';
// dots.src = 'http://betweentwobrackets.com/content/images/2016/01/dots-1.png';
// dots.onload = function() {
//     // create a canvas to hold the pattern
//   var patternCanvas = document.createElement("canvas");
//     patternCanvas.width = 300;
//     patternCanvas.height = 300;

//     // create coloured background rect
//     var fillContext = patternCanvas.getContext("2d");
//   fillContext.fillStyle = "#F7464A";
//   fillContext.fillRect(0,0,300,300);

//     // create pattern overlay rect
//     var patternContext = patternCanvas.getContext("2d");
//     var pattern = patternContext.createPattern(dots, 'repeat');
//   patternContext.fillStyle = pattern;
//   patternContext.fillRect(0,0,300,300);

//     // create a canvas for the highlight state
//   var highlightPatternCanvas = document.createElement("canvas");
//     highlightPatternCanvas.width = 300;
//     highlightPatternCanvas.height = 300;

//     // create coloured background rect for highlight state
//     var highlightFillContext = highlightPatternCanvas.getContext("2d");
//   highlightFillContext.fillStyle = "#FF5A5E";
//   highlightFillContext.fillRect(0,0,300,300);

//     // create pattern overlay rect for highlight state
//     var highlightPatternContext = highlightPatternCanvas.getContext("2d");
//     var highlightPattern = highlightPatternContext.createPattern(dots, 'repeat');
//   highlightPatternContext.fillStyle = highlightPattern;
//   highlightPatternContext.fillRect(0,0,300,300);

//     var data = [
//       {
//           value: 300,
//           color: chartContext.createPattern(patternCanvas, 'repeat'),
//           highlight: chartContext.createPattern(highlightPatternCanvas, 'repeat'),
//           label: "Red"
//       },
//       {
//           value: 50,
//           color: "#46BFBD",
//           highlight: "#5AD3D1",
//           label: "Green"
//       },
//       {
//           value: 100,
//           color: "#FDB45C",
//           highlight: "#FFC870",
//           label: "Yellow"
//       }
//   ];

//     //var patternChart = new Chart(chartContext).Doughnut(data);
// };

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

var questIDs = ["HYz7eABQhAj4", "qyAu3fGmLhdx", "ryvnMD1A4hRs", "CKVLadvPFOO2", "DsQwqmTj8onU", "pxf6VB5SaFJb", "Ya0OPd36Plbk", "wFiEOvH5IAOW", "RSvGdGSzrKJ4"];

var colors = ['#7ea5d7', '#b1dad0', '#6a76b7'];
//var colors = [chartContext.createPattern(patternCanvas, 'repeat'), 'rgba(255, 241, 175, 0.3)', 'rgba(248, 170, 143, 0.3)'];

var m3qData = [],
    pointsColors = [],
    percentages = [],
    answers = [],
    labels = [],
    exResponses = [1, 1, 3, 3, 3, 3, 1, 1, 1];

var $lgStrong = $(".legend-strong"),
    $lgMed = $(".legend-med"),
    $lgLow = $(".legend-low"),
    $lgZero = $(".legend-zero");

var svgItems = ["#equipo","#saludbenestar","#liderzago","#foundations","#engagement","#culturacambio","#capitalhumano","#governancia","#eficiencia"]

function colorPath(el,value, color) {
    if( value == 3 ){
        $(el).find("#tre, #due, #uno").css('fill', color);
    } else if( value == 2 ){
        $(el).find("#due, #uno").css('fill', color);
    }  else if( value == 1 ){
        $(el).find("#uno").css('fill', color);
    }
}

function assignColor(value) {
  var color;
  if( value < 3 ){
    color = colors[0];
  } else if( value >= 3 && value < 6 ){
    color = colors[1];
  }  else if( value >= 6 ){
    color = colors[2];
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
  console.log(array);
  return array;
}

function mainChart(array) {
    for( i=0, c=0; i<svgItems.length; i+=3, c++){
        colorPath(svgItems[i], array[i], colors[c]);
        colorPath(svgItems[i+1], array[i+1], colors[c]);
        colorPath(svgItems[i+2], array[i+2], colors[c]);
    }
}

function singleCharts(array) {
    var wBar, elColor;

    // Single
    for( i=0; i<array.length; i++){
        wBar = array[i]*33.33;
        //elColor = assignColor(i);
        //console.log(wBar + " " + elColor);
        $('.result-value[data-answer="'+(i+1)+'"]').find('.bar').width(wBar+"%");
    }

    // Promedio
    for( n=0; n<colors.length; n++){
        var i = n*3;
        wBar = (Math.round( (array[i]+array[i+1]+array[i+2])/3 ) )*33.33;
        //elColor = assignColor(n);
        $('.result-value[data-groupaverage="'+(n+1)+'"]').find('.bar').width(wBar+"%");

        // if(elColor == "green") {
        //     $lgStrong.append("<span>" + titles[n] + "</span> ");
        //     //console.log(titles[n]);
        // } else if(elColor == "yellow") {
        //     $lgMed.append("<span>" + titles[n] + "</span> ");
        // } else if(elColor == "red") {
        //     $lgLow.append("<span>" + titles[n] + "</span> ");
        // } else  {
        //     $lgZero.append("<span>" + titles[n] + "</span> ");
        // }
    }

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
    url: "https://api.typeform.com/forms/D3Yyb5",
    method: "GET",
    headers: {
        "Authorization" : "Bearer " + '7ivycDSoFRWyXAkecThrsuXLKDqYtjBt6FpbrqCtwXmB'
    },
    success: function(response) {
        var label;
        console.log( response );

        // Parsing JSON for answer values by ID
        for(var n=0; n<questIDs.length; n++) {
            for(var i=0; i<response.fields.length; i++) {
                //console.log(response.items[0].answers[i].field.id);
                if(response.fields[i].id == questIDs[n]){
                    label = response.fields[i].properties.description.substr(1).slice(0, -1);
                    console.log(label);
                    $('.result-value[data-answer="'+(n+1)+'"]').prev('.result-text').find('h3').html(label);
                    //console.log($('.result-value[data-answer="'+(n+1)+'"]').prev('h3').html());
                }
            }
        }
    }
  });

  $.ajax({
      url: "https://api.typeform.com/forms/D3Yyb5/responses?query="+email,
      method: "GET",
      headers: {
          "Authorization" : "Bearer " + '7ivycDSoFRWyXAkecThrsuXLKDqYtjBt6FpbrqCtwXmB'
      },
      success: function(response) {
          //var ids = [];
          console.log( response );

          // Parsing JSON for answer values by ID
          for(var n=0; n<questIDs.length; n++) {
              for(var i=0; i<response.items[0].answers.length; i++) {
                  //console.log(response.items[0].answers[i].field.id);
                  if(response.items[0].answers[i].field.id == questIDs[n]){
                      answers[n] = response.items[0].answers[i].choice.label;
                  }
              }
          }

          console.log( answers );
          answers = extractValues(answers);
          //console.log( response.items[0].answers );
          mainChart(answers);
          singleCharts(answers);
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
