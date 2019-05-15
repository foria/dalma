// AOS plugin init
AOS.init();

var titles = [
  'Personas',
  'Cultura',
  'Procesos'
];

var questIDs = ["mkQzZuoBagUE", "xZ9C3IFbPuh9", "nMgV9jwzu2gx", "xDj4k6FS2EDI", "EBSsbcn71Q5I", "y8GiqGtHYK3h", "KwsgtPlUWM5n", "h0h6W6CREglw", "ksZfEut5UENm"];

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
  //console.log(array);
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
        var average = Math.round( (array[i]+array[i+1]+array[i+2])/3 );
        //wBar = average * 33.33;
        wBar = (array[i]+array[i+1]+array[i+2]) * 11.11;
        //elColor = assignColor(n);
        $('.result-value[data-groupaverage="'+(n+1)+'"]').find('.bar').width(wBar+"%");

        if(average > 2) {
            $lgStrong.append("<span>" + titles[n] + "</span> ");
            //console.log(titles[n]);
        } else if(average > 1) {
            $lgMed.append("<span>" + titles[n] + "</span> ");
        } else if(average > 0) {
            $lgLow.append("<span>" + titles[n] + "</span> ");
        }
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
    url: "https://api.typeform.com/forms/KcmgmL",
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
      url: "https://api.typeform.com/forms/KcmgmL/responses?query="+email,
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

          //console.log( answers );
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


// PDF variables
var element = document.getElementById('m3q');
var opt = {
  margin:       [0,0.5,0,0.5],
  pagebreak:    { mode: ['legacy'] },
  filename:     'm3q_report-'+userEmail+'.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 1 },
  jsPDF:        { unit: 'in', orientation: 'landscape', compressPDF: true }
};

function createPDF(){
  $('body').addClass('printpdf');
  $('#chart').width(orChartSize);
  $('#chart').height(orChartSize);

  html2pdf().set(opt).from(element).save().then(function(pdf){
    resizeChart();
    $('body').removeClass('printpdf');
  });

}

$('#pdf-creatiion').click(function(){
  //console.log('test');
  createPDF();
})

function sendPDF(){
  $('body').addClass('printpdf');
  $('#chart').width(orChartSize);
  $('#chart').height(orChartSize);

  html2pdf().set(opt).from(element).toPdf().output('datauri').then(function (pdfAsString) {
    // The PDF has been converted to a Data URI string and passed to this function.
    // Use pdfAsString however you like (send as email, etc)! For instance:
    console.log(pdfAsString);

    var $button = $('#pdf-mail');
    $.ajax({
        type: 'POST',
        url: "sendemail.php",
        data: {
            //Name: $("#name").val(),
            Email: userEmail,
            //Message: $("#message").val(),
            Attachment: pdfAsString
        }
    }).done(function(data) {
        $button.html('Email Sent!').delay(3210);
        resizeChart();
        $('body').removeClass('printpdf');
    });

    // Email.send({
    //     SecureToken : "da729942-8dc5-4fcc-90a2-d43a824af356",
    //     To : userEmail,
    //     From : "m3q-result@dalmabp.com",
    //     Subject : "This is the subject",
    //     Body : "This is the subject",
    //     Attachments : [{
    //       name : 'm3q_report-'+userEmail+'.pdf',
    //       path : pdfAsString
    //     }]
    // }).then(
    //   message => alert(message)
    // );

  });

}

$('#pdf-mail').click(function(){
  //console.log('test');
  sendPDF();
})
