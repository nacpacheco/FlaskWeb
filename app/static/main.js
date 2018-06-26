$(document).ready(function(){
$('#AIADatePicker').datetimepicker({
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

$('#startDatePicker').datetimepicker({
    onShow:function( ct ){
        this.setOptions({
            theme: 'dark'
        })
    },
});
});

$('#plotAIA').click(function(e) {
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
       });
});

$('#plotTimeSeries').click(function(e){
       e.preventDefault();
        $.getJSON($SCRIPT_ROOT + '/AIATimeSeries', {
            a: $('#startDatePicker').val(),
            b: $('#endDatePicker').val()
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
});



