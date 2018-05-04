$(document).ready(function(){
    $('#clickme').click(function(e){
        e.preventDefault();
        jsPanel.create({
            theme:       'default',
            headerTitle: 'Panel',
            position:    'center-top 0 58',
            contentSize: '373 406',
            contentAjax: {
                    url: 'http://127.0.0.1:5000/AIA/',
					method: 'POST',
		     beforeSend: function () { $('#loader').html('<img src="./static/cat-loader.gif"/>');},
			 done:   function (panel) {
                panel.content.innerHTML = this.responseText;
                $('#loader').html('');
            },
            },
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
    jsPanel.create({
            theme:       'default',
            headerTitle: 'Plot info',
            position:    'center-top 0 58',
            contentSize: '540 427',
            contentAjax: {
            url: 'http://127.0.0.1:5000/plot_info/',
            method: 'POST',
            done: function(panel) {
             panel.content.innerHTML = this.responseText;
                },
            },
            callback: function () {
                this.content.style.padding = '20px';
            }
    });
};

