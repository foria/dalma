
  var labels = [
      'Aportación de valor',
      'Salud y bienestar',
      'Liderazgo',
      'ADN',
      'Atracción de talento',
      'Modelo de transformación',
      'Capital humano',
      'Governancia',
      'Eficiencia y agilidad'
    ];

  var data = [
      100,
      30,
      80,
      50,
      10,
      80,
      60,
      40,
      20
    ]

  var colors = []

  for( i=0; i<data.length; i++){
    if( data[i] > 79 ){
      colors[i] = 'rgba(132,191,136, 0.3)';
    } else if( data[i] > 39 ){
      colors[i] = '#fff1af';
    } else {
      colors[i] = '#f8aa8f';
    }
  }

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


var chart = new Chart('main-chart', {
    type: 'polarArea',
    data: {
          labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
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
                color: '#fcfcfc'
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
                  display: false
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

// $(document).ready(function(){
//     'use strict';


// })

function testCall() {
    $.ajax({
        url: "https://api.typeform.com/forms/fepjH3/responses?query=foriaa@gmail.com",
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + '7ivycDSoFRWyXAkecThrsuXLKDqYtjBt6FpbrqCtwXmB'
        },
        success: function(response) {
            console.log(response);
        }
    });
}
