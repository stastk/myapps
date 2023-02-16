var url = '/cgi-bin/t.cgi'
$(document).ready(function() {

    var content            = $("textarea");
    var gibberish_textarea = $("#rm_gibberish textarea")

    content.bind('input propertychange', function() {
        let misunderstanding = ["q", "x", ":"]
        misunderstanding.forEach(function(char) {
            gibberish_textarea.val(gibberish_textarea.val().replace( char,  "" ));
        });
        transcript_it($(this).data("gibberish-or-normal"));
        return false;
    });

    function transcript_it(gibberish_or_normal){

        let textarea = $("#rm_"+ gibberish_or_normal +" textarea")
        let value_to_send = textarea.val().replace(/["]/g,'\\"');
        //value_to_send = value_to_send.replace(/[/]/g,'\/');
        //value_to_send = value_to_send.replace(/[\\]/g,'\\');
        console.log("value_to_send: " + value_to_send)
        $.ajax({
            url: url,
            type: "POST",
            data: {t: value_to_send, d: gibberish_or_normal},
            success: function(response){
                console.log("response:" + response);
                let obj = JSON.parse(response);
                let text = obj['text'];
                let direction = obj['direction'];
                let invert_direction = obj['invert_direction'];

                text = decodeURIComponent(escape(atob(text)));
                
                $("#rm_" + direction + " textarea").val(text);
                $("#rm_" + direction + " .transcription").html(text);
                $("#rm_" + invert_direction + " .transcription").html($("#rm_" + invert_direction + " textarea").val());
                console.log("direction:" + direction + "; invert_direction: " + invert_direction + "; text: " + text);
            }
        });
        return false;
    }
    

});