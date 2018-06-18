$(document).ready(function(){
$('#startDatePicker').datetimepicker({
  onShow:function( ct ){
   this.setOptions({
    theme: 'dark'
   })
  },
 });

$('#endDatePicker').datetimepicker({
    onShow:function( ct ){
        this.setOptions({
            theme: 'dark'
         })
    },
    });
});

$('#clickmeAIA').click(function(e){
        e.preventDefault();
        $('#info').css('display', '');
    });

$('#plotAIA').click(function(e) {
   e.preventDefault();
   $.getJSON($SCRIPT_ROOT + '/AIA', {
        a: $('#startDatePicker').val(),
        b: $('#endDatePicker').val(),
        c: $('#inputGroupSelect01').val()
      }, function(data) {
          if($('#AIA-info').prop('checked')) {
               $.getJSON($SCRIPT_ROOT + '/plot_info', {
                a: data.result
              }, function(data) {
                   jsPanel.create({
                    theme:       'default',
                    headerTitle: 'AIA Info',
                    position:    'center-top 0 20',
                    contentSize: '540 427',
                    content: data.result,
                    callback: function () {
                        this.content.style.padding = '20px';
                    }
                  });
                });
           }
           if($('#AIA-image').prop('checked')) {
               $.getJSON($SCRIPT_ROOT + '/plot_image', {
                a: data.result
              }, function(data) {
                   jsPanel.create({
                    theme:       'rgb(0,0,0) filled',
                    headerTitle: 'AIA Image',
                    position:    'center-top 0 58',
                    contentSize: '373 406',
                    content: data.result,
                    callback: function () {
                        this.content.style.padding = '20px';
                    }
                  });
                });
           }
           if($('#AIA-lightcurve').prop('checked')) {
               $.getJSON($SCRIPT_ROOT + '/plot_lightcurve', {
                a: data.result
              }, function(data) {
              console.log(data.result);
                   jsPanel.create({
                    theme:       'default',
                    headerTitle: 'AIA LightCurve',
                    position:    'center-top 0 58',
                    contentSize: '373 406',
                    content: data.result,
                    callback: function () {
                        this.content.style.padding = '20px';
                    }
                  });
                });
           }
       });
});

//$('#clickmeEIT').click(function(e){
//        e.preventDefault();
//        jsPanel.create({
//            theme:       'rgb(0,0,0) filled',
//            headerTitle: 'Panel',
//            position:    'center-top 0 58',
//            contentSize: '373 406',
//            contentAjax: {
//                    url: 'http://127.0.0.1:5000/EIT/',
//					method: 'POST',
//		     beforeSend: function () { $('#loader').html('<img src="./static/cat-loader.gif"/>');},
//			 done:   function (panel) {
//                panel.content.innerHTML = this.responseText;
//                $('#loader').html('');
//                $('#datetimepicker').datetimepicker();
//                $('#datetimepicker').on("dp.hide", function(e){
//                alert("Date has changed to " + (e.date).toDate());
//                $("#img").attr("src","static/dino.png");
//            });
//            },
//            },
//             callback: function () {
//                this.content.style.padding = '20px';
//            }
//            });
//    });
//});

//function plot_info(){
//    jsPanel.create({
//            theme:       'default',
//            headerTitle: 'Plot info',
//            position:    'center-top 0 58',
//            contentSize: '540 427',
//            contentAjax: {
//            url: 'http://127.0.0.1:5000/plot_info/',
//            method: 'POST',
//            done: function(panel) {
//             panel.content.innerHTML = this.responseText;
//                },
//            },
//            callback: function () {
//                this.content.style.padding = '20px';
//            }
//    });
//};

