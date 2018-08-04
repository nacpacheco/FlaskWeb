$(document).ready(function(){

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

$('#AIADatePicker').datetimepicker({
    maxDate:'+0',
    minDate: '2010/05/20',
    theme:'dark'
 });

$('#endDatePicker').datetimepicker({
 onShow:function( ct ){
   this.setOptions({
        minDate:$('#startDatePicker').val()?$('#startDatePicker').val():false
       })
     },
    maxDate: '-1970/01/02',
    minDate: $('#startDatePicker').val(),
    theme:'dark'
  });

$('#startDatePicker').datetimepicker({
 maxDate:'+0',
 onShow:function( ct ){
   this.setOptions({
    maxDate:$('#endDatePicker').val()?$('#endDatePicker').val():false
   })
  },
     minDate: '2010/05/20',
     theme:'dark'
});
});

$('#plotAIA').click(function(e) {
   if ($('#AIADatePicker').val() == "" || $('#AIADatePicker').val() > new Date($.now())){
          $.alert({
            title: 'Ops!',
            content: 'Please insert a valid date to plot!',
        });
   } else if ($('#AIA-info').prop('checked') == false && $('#AIA-image').prop('checked') == false){
            $.alert({
                title: 'Ops!',
                content: 'Please select a type of figure to plot!',
            });
    } else {
       $.LoadingOverlay("show");
       e.preventDefault();
       $.getJSON($SCRIPT_ROOT + '/AIA', {
            a: $('#AIADatePicker').val(),
            c: $('#inputGroupSelect01').val()
          }, function(data) {
              if($('#AIA-info').prop('checked')) {
                   $.getJSON($SCRIPT_ROOT + '/plot_info', {
                    a: data.result
                  }, function(data) {
                       jsPanel.create({
                        theme:       'default',
                        headerTitle: 'AIA Info from ' + $('#AIADatePicker').val(),
                        headerToolbar: data.download,
                        position:    'center-top 0 20',
                        contentSize: '540 427',
                        content: data.result,
                        callback: function () {
                            this.content.style.padding = '20px';
                        }
                      });
                          $.LoadingOverlay("hide");
                    });
               }
               if($('#AIA-image').prop('checked')) {
                   $.getJSON($SCRIPT_ROOT + '/plot_image', {
                    a: data.result
                  }, function(data) {
                       jsPanel.create({
                        theme:       'rgb(0,0,0) filled',
                        headerTitle: 'AIA Image from '+ $('#AIADatePicker').val(),
                        headerToolbar: data.download,
                        position:    'center-top 0 58',
                        contentSize: '475 430',
                        content: data.result,
                        callback: function (panel) {
                            this.content.style.padding = '20px';
                        }
                      });
                       $.LoadingOverlay("hide");
                    });
               }
           });
}
});

$('#plotTimeSeries').click(function(e){
if( $('#startDatePicker').val() == "" || $('#endDatePicker').val() == ""){
        $.alert({
            title: 'Ops!',
            content: 'Please insert valid dates to plot!',
        });
    } else {
       $.LoadingOverlay("show");
       e.preventDefault();
        $.getJSON($SCRIPT_ROOT + '/AIATimeSeries', {
            a: $('#startDatePicker').val(),
            b: $('#endDatePicker').val()
              }, function(data) {
                   jsPanel.create({
                    theme:       'default',
                    headerTitle: 'TimeSeries from '+ $('#startDatePicker').val(),
                    headerToolbar: data.download,
                    position:    'center-top 0 20',
                    contentSize: '540 427',
                    content: data.result,
                    callback: function () {
                        this.content.style.padding = '20px';
                    }
                  });
                  $.LoadingOverlay("hide");
               });
        }
});





