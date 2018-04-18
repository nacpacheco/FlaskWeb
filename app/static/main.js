$(document).ready(function(){
    $('#clickme').click(function(e){
        e.preventDefault();
        jsPanel.create({
            theme:       'primary',
            headerTitle: 'my panel #1',
            position:    'center-top 0 58',
            contentSize: '450 500',
            content:     '<img id="img" src="/static/colors.png" style="width: inherit; padding-bottom: 6px;"><div class="input-group date" id="datetimepicker"><input type="text" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div>',
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

