$(document).ready(function(){
$('#datetimepicker').datetimepicker();
//                $('#datetimepicker').on("dp.hide", function(e){
//                alert("Date has changed to " + (e.date).toDate());
//                });

$('#clickmeAIA').click(function(e){
        e.preventDefault();
        $('#info').css('display', '');
//        jsPanel.create({
//            theme:       'rgb(0,0,0) filled',
//            headerTitle: 'Panel',
//            position:    'center-top 0 58',
//            contentSize: '373 406',
//            contentAjax: {
//                    url: 'http://127.0.0.1:5000/AIA/',
//					method: 'POST',
//		     beforeSend: function () { $('#loader').html('<img src="./static/cat-loader.gif"/>');},
//			 done:   function (panel) {
//                panel.content.innerHTML = this.responseText;
//                $('#loader').html('');
//            },
//            },
//             callback: function () {
//                this.content.style.padding = '20px';
//            }
//            });
    });

$('#clickmeEIT').click(function(e){
        e.preventDefault();
        jsPanel.create({
            theme:       'rgb(0,0,0) filled',
            headerTitle: 'Panel',
            position:    'center-top 0 58',
            contentSize: '373 406',
            contentAjax: {
                    url: 'http://127.0.0.1:5000/EIT/',
					method: 'POST',
		     beforeSend: function () { $('#loader').html('<img src="./static/cat-loader.gif"/>');},
			 done:   function (panel) {
                panel.content.innerHTML = this.responseText;
                $('#loader').html('');
                $('#datetimepicker').datetimepicker();
                $('#datetimepicker').on("dp.hide", function(e){
                alert("Date has changed to " + (e.date).toDate());
                $("#img").attr("src","static/dino.png");
            });
            },
            },
             callback: function () {
                this.content.style.padding = '20px';
            }
            });
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

