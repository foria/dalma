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
//AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll

  // Settings that can be overriden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

var labels = [
  'Equipo',
  'Salud y bienestar',
  'Liderazgo',
  'Fundations',
  'Atracción de talento',
  'Change Management',
  'Capital humano',
  'Governancia',
  'Eficiencia y agilidad'
];

var colors = ['rgba(132,191,136, 0.3)', 'rgba(255, 241, 175, 0.3)', 'rgba(248, 170, 143, 0.3)'];
//var colors = [chartContext.createPattern(patternCanvas, 'repeat'), 'rgba(255, 241, 175, 0.3)', 'rgba(248, 170, 143, 0.3)'];

var m3qData = [],
    pointsColors = [],
    percentages = [],
    answers = [],
    exData = [100,30,80,50,10,80,60,40,20],
    exResponses = [5,5,3,4,1,4,3,4,2,5,4,3,4,1,4,3,4,3,5,3,3,4,1,4,3,4,2];
    //exResponses = [2,2,2,0,0,0,5,5,5,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];

var $lgStrong = $(".legend-strong"),
    $lgMed = $(".legend-med"),
    $lgLow = $(".legend-low");

Chart.helpers.merge(Chart.defaults.global, {
    maintainAspectRatio: false,
    //tooltips: false,
    // layout: {
    //  padding: 16
    // },
    // elements: {
    //  arc: {
    //            borderWidth: 10
    //  }
    // },
    plugins: {
      legend: false,
      //title: false
    }
});

// Chart.plugins.register({
//   beforeDraw: function(chartInstance) {
//     var ctx = chartInstance.chart.ctx;
//        var centerX = chartInstance.chart.width / 2;
//     var centerY = chartInstance.chart.height / 2;
//     ctx.beginPath();
//      ctx.arc(centerX, centerY, centerX, 0, Math.PI * 2, true); // Outer circle
//     ctx.fillStyle = "red";
//  ctx.fill();
//   }
// });

function assignColor(value, getClass) {
    if( value > 79 ){
        if(getClass){
            return "green";
        } else {
            return colors[0];
        }
    } else if( value > 39 ){
        if(getClass){
            return "yellow";
        } else {
            return colors[1];
        }
    } else {
        if(getClass){
            return "orange";
        } else {
            return colors[2];
        }
    }
}

function mainChart(array) {

    // Get avarage percentage values
    for( i=0, b=0; i<array.length; i+=3, b++){
        m3qData[b] = Math.round( ((array[i]+array[i+1]+array[i+2])/3) * 100/5 );
    }
    //console.log(m3qData);

    for( i=0; i<m3qData.length; i++){
        pointsColors[i] = assignColor(m3qData[i]);
    }
    //console.log(pointsColors);

    var chart = new Chart('mainchart', {
        type: 'polarArea',
        data: {
              labels: labels,
                datasets: [{
                    data: m3qData,
                    backgroundColor: pointsColors,
                    borderWidth: 4,
                  hoverBorderColor: 'white',
                  hoverBorderWidth: 4
                }]
            },
        options: {
              scale: {
                // angleLines:{
                //     display: true,
                //     color: 'white',
                //     lineWidth: 30
                // },
                pointLabels: {
                  //display: true,
                  // callback: function(pointLabel, index, labels) {
                 //        console.log(pointLabel + " " + index + " " + labels);
                    //}
                },
                gridLines:{
                    lineWidth: 15,
                    color: '#fcfcfc',
                    drawBorder: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                    tickMarkLength: 100,
                    zeroLineWidth: 10,
                    // zeroLineColor: 'rgba(0,0,0,0.25)',
                    // zeroLineBorderDash: [],
                    // zeroLineBorderDashOffset: 0.0,
                    offsetGridLines: true,
                    // borderDash: [],
                    // borderDashOffset: 0.0
                },
            // tooltips: {
            //  mode: 'index',
            //  callbacks: {
            //    // Use the footer callback to display the sum of the items showing in the tooltip
            //    footer: function(tooltipItems, data) {
            //      var sum = 0;
            //      tooltipItems.forEach(function(tooltipItem) {
            //        sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            //      });
            //      return 'Sum: ' + sum;
            //    },
            //  },
            //  footerFontStyle: 'bold'
            // },
                tooltips: {
                    custom: function(tooltip) {
                        // tooltip will be false if tooltip is not visible or should be hidden
                        if (!tooltip) {
                            return;
                        }
                        tooltip.body = ['TEST']
                    }
                },
                  ticks: {
                    display: false,
                    // suggestedMin: 0,
                    // suggestedMax: 100
                    max: 100,
                    //min: 0,
                    //stepSize: 10
                  }
              },
          startAngle: 2.510*Math.PI,
          // plugins: {
          //  datalabels: {
          //    anchor: 'end',
          //    align: 'end',
          //    //offset: 150,
          //    backgroundColor: function(context) {
          //      return context.dataset.backgroundColor;
          //    },
          //    borderColor: 'white',
          //    //borderRadius: 25,
          //    borderWidth: 2,
          //    color: 'white',
          //    font: {
          //      weight: 'bold'
          //    },
          //    formatter: function(value, context) {
        //                         return context.chart.data.labels[context.dataIndex];
        //                     }
          //  }
          // }
          //     animation: {
          //         duration: 1,
          //         onComplete: function() {
              // var chartInstance = this.chart,
              // ctx = chartInstance.ctx;

              // ctx.font = "15px Arial";
              // ctx.textAlign = 'right';
              // ctx.textBaseline = 'bottom';
              // ctx.fillStyle = "#000";

              // this.data.datasets.forEach(function(dataset, i) {
              //  var meta = chartInstance.controller.getDatasetMeta(i);
              //  meta.data.forEach(function(bar, index) {
              //  var myangl=((bar._model.startAngle)+(bar._model.endAngle))/2;
              //  var xpoint= (parseFloat(bar._model.outerRadius)+20)*(Math.cos(myangl)) + (bar._model.x);
              //  var ypoint= (parseFloat(bar._model.outerRadius)+20)*(Math.sin(myangl)) + (bar._model.y);
              //  ctx.fillText(bar._model.label,xpoint ,ypoint);
              //  });
              // });
          //         }
          //     }
        }
    });
}

function singleCharts(array) {
    var wBar, elHTML;

    // Transform answers in percentage values
    for( i=0; i<array.length; i++){
        wBar = array[i]*100/5;
        elColor = assignColor(wBar, true);
        //console.log(wBar + " " + elColor);
        $('.result-value[data-answer="'+(i+1)+'"]').find('.bar').addClass(elColor).width(wBar+"%");
        $('.result-value[data-answer="'+(i+1)+'"]').attr("title",wBar+"%");


        //$('.result-value[data-answer="'+(i+1)+'"]').html(elHTML);

        //console.log(elHTML);
    }

    // Transform answers in percentage values
    //console.log(m3qData);
    for( n=0; n<m3qData.length; n++){
        wBar = m3qData[n];
        elColor = assignColor(wBar, true);
        $('.result-value[data-groupaverage="'+(n+1)+'"]').find('.bar').addClass(elColor).width(wBar+"%");
        $('.result-value[data-groupaverage="'+(n+1)+'"]').attr("title",wBar+"%");


        if(elColor == "green") {
            $lgStrong.append("<span>" + labels[n] + "</span> ");
            //console.log(labels[n]);
        } else if(elColor == "yellow") {
            $lgMed.append("<span>" + labels[n] + "</span> ");
        } else {
            $lgLow.append("<span>" + labels[n] + "</span> ");
        }
    }

    $('[data-toggle="tooltip"]').tooltip();

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
        url: "https://api.typeform.com/forms/fepjH3/responses?query="+email,
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + '7ivycDSoFRWyXAkecThrsuXLKDqYtjBt6FpbrqCtwXmB'
        },
        success: function(response) {
            // Parsing JSON for answer values
            for(var i=1; i<response.items[0].answers.length; i++) {
                answers[i-1] = response.items[0].answers[i].number;
            }
            //console.log( response.items[0].answers );
            console.log( answers );
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
