var fits = ""
$(document).ready(function(){
    $('#clickme').click(function(e){
        e.preventDefault();

        var currentdate = new Date();
        var endDate = currentdate.getFullYear()+'/'+(currentdate.getMonth()+1)+'/'+currentdate.getDate()+' '+
        currentdate.getHours()+':'+currentdate.getMinutes() +':'+currentdate.getSeconds();
        var startDate = currentdate.getFullYear()+'/'+(currentdate.getMonth()+1)+'/'+currentdate.getDate()+' '+
        (currentdate.getHours()-1)+':'+currentdate.getMinutes()+':'+currentdate.getSeconds();
        $.ajax({
					url: 'http://127.0.0.1:5000/AIA/',
					data: {'startdate': startDate,
					        'enddate': endDate},
					method: 'POST',
					success: function(data) {
					}
				});

        jsPanel.create({
            theme:       'default',
            headerTitle: 'my panel #1',
            position:    'center-top 0 58',
            contentSize: '390 370',
            content:     '<img id="img" src="static/AIA_image_clean.png" style="width: inherit; padding-bottom: 6px;">'
           +'<div class="input-group date" id="datetimepicker">'
           +'<input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar">'
           +'</span></span></div><button id="plot_info" class="btn btn-default" onClick="plot_info()">Plot Info</button>',
            callback: function () {
                this.content.style.padding = '20px';
            }
            });

        function setdatetime(){
            $('#datetimepicker').datetimepicker();
            $('#datetimepicker').on("dp.hide", function(e){
                alert("Date has changed to " + (e.date).toDate());
                $("#img").attr("src","static/dino.png");
            });
        };
        setTimeout(setdatetime, 250);
    });
});

function plot_info(){
       $.ajax({
        url: 'http://127.0.0.1:5000/plot_info/',
        data: {'fits': fits},
        method: 'POST',
        success: function(data) {
        }
    });
    jsPanel.create({
            theme:       'default',
            headerTitle: 'my panel #1',
            position:    'center-top 0 58',
            contentSize: '390 370',
            content:     '<img id="img" src="static/AIA_info.png" style="width: inherit; padding-bottom: 6px;">',
            callback: function () {
                this.content.style.padding = '20px';
            }
            });
};

