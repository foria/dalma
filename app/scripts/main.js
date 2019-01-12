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

var questIDs = ["GjZDxIWoitHN", "vHMsURMZG6OH", "jYrB63LOG14O", "Br4ZYLekorFP", "Xhv6eCVDoz72", "wMJmJyPzmQYq", "Q9Opyui1HYXS", "BiNDYgL6pijY", "RQcikfxqnZAM", "hc3VAxHesd6e", "QbWdWlaB6WiB", "oAFijsOTsBSB", "qh2xtO25fFcY", "Vsnk5SUFoes6", "CTq9eh0oGTUS", "A6ng25Gj39Bb", "kfQpbN5VbBsy", "aeWEGlBHNDMS", "shitJPiYNY5u", "H4r9pNIb6nEw", "KhhCWMwoK6jG", "ET5HUcq3sMZL", "n9PZvY4rVe99", "rCIV2QLNt7zc", "hDzFIlUxCBi9", "hTcrVpRYPUfk", "aqmD7IzJfLQf"];

//var colors = ['rgba(132,191,136, 0.3)', 'rgba(255, 241, 175, 0.3)', 'rgba(248, 170, 143, 0.3)'];
//var colors = [chartContext.createPattern(patternCanvas, 'repeat'), 'rgba(255, 241, 175, 0.3)', 'rgba(248, 170, 143, 0.3)'];

var m3qData = [],
    pointsColors = [],
    percentages = [],
    answers = [],
    labels = [],
    exData = [100,30,80,50,10,80,60,40,20],
    exResponses = [3,3,3,1,1,1,2,2,2,0,0,0,1,2,3,1,1,3,2,2,3,1,1,2,2,2,1];

var $lgStrong = $(".legend-strong"),
    $lgMed = $(".legend-med"),
    $lgLow = $(".legend-low");

var svgItems = ["#equipo","#saludbenestar","#liderzago","#foundations", "#culturacambio", "#capitalhumano","#governancia", "#eficiencia", "#engagement"]

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
    chartSize = parseInt($(window).width())*0.60;
    $('#chart').width(chartSize);
    $('#chart').height(chartSize);
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
    // Get avarage percentage values
    for( i=0, b=0; i<array.length; i+=3, b++){
        m3qData[b] = Math.round( (array[i]+array[i+1]+array[i+2])/3 );
    }
    console.log(m3qData);

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
        $('.result-value[data-answer="'+(i+1)+'"]').prev('h3').html(labels[i]);
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
        } else {
            $lgLow.append("<span>" + titles[n] + "</span> ");
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
        //var ids = [];
        console.log( response );

        // Parsing JSON for answer values by ID
        for(var n=0; n<questIDs.length; n++) {
            for(var i=0; i<response.fields.length; i++) {
                //console.log(response.items[0].answers[i].field.id);
                if(response.fields[i].id == questIDs[n]){
                    labels[n] = response.fields[i].properties.description.substr(1).slice(0, -1);
                }
            }
        }
        console.log(labels);
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
    $('#chart').width(chartSize);
    $('#chart').height(chartSize);
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
