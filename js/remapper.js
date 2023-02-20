var url = '/cgi-bin/t.cgi'
$(document).ready(function() {

    var content            = $("textarea");
    var gibberish_textarea = $("#rm_gibberish textarea")

    content.bind('input propertychange', function() {
        let misunderstanding = ["q", "x", ":", "j"]
        misunderstanding.forEach(function(char) {
            gibberish_textarea.val(gibberish_textarea.val().replace( char,  "" ));
        });
        transcript_it($(this).data("gibberish-or-normal"));
        return false;
    });

    var gib = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "¯", "-", "«", "⅄", "Ⅺ", "⸘", "‽", "¿", "?", "!", "*", "+", "e", "b", "d", "u", "i", "k", "Q", "E", "w", "h", "c", "m", "n", "o", "p", "C", "r", "L", "t", "Y", "l", "v", "s", "y", "&", "K", "O", "A", "%", "N", "Z", "H", "T", "J", "a", "_", "I", "B", "U", "F", "G", "z", "V", "R", "$", "M", "P", "f", "S", "W", "D", "g", "/", "~", "\\", ".", "|", ",", " ", ":"];
    var nor = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "−", "-", "«", "Y", "X", "⸘", "‽", "¿", "?", "!", "*", "+", "a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ð", "ø", "č", "ķ", "ŋ", "θ", "ţ", "ť", "ž", "ǆ", "ǥ", "ǧ", "ǩ", "ɒ", "ə", "ɢ", "ɣ", "ɬ", "ɮ", "ɴ", "ʁ", "π", "φ", "χ", "ẅ", "’", "'", "š", ":", "\"", "/", "“", ".", "^", " ", "," ];
    $.each (gib, function( indexes, values ) {
        if (values == " "){
            desc = 'space'
        } else {
            desc = values
        };
        $(".rm_gibberish_map").append("<div class='char' data-char='" + values + "' data-gibberish-or-normal=><span>" + values + "</span><i>" + desc + "</i></div>");
    });
    $.each (nor, function( indexes, values ) {
        if (values == " "){
            desc = 'space'
        } else {
            desc = values
        };
        $(".rm_normal_map").append("<div class='char' data-char='" + values + "' data-gibberish-or-normal=><span>" + values + "</span><i>" + desc + "</i></div>");
    });

    $('.char').on("click", function() {
        let direction = $(this).parent().data("gibberish-or-normal")
        let value = $(this).find('span').text();
        console.log("VALUE: " + value + "; direction: " + direction + ";");
        let textarea = $("#rm_" + direction + " textarea");
        textarea.val(textarea.val() + value);
        console.log("TEXTAREA: " + textarea.val());
        transcript_it(direction);
    });

    function transcript_it(gibberish_or_normal){

        let textarea = $("#rm_"+ gibberish_or_normal +" textarea")
        let value_to_send = rot13(textarea.val().replace(/["]/g,'\\"'));
        console.log("value_to_send: " + value_to_send)
        $.ajax({
            url: url,
            type: "POST",
            data: {t: value_to_send, d: gibberish_or_normal},
            success: function(response){
                console.log("response:" + response);
                let obj = JSON.parse(response);
                let text = String.fromCharCode.apply(null, obj['text']);
                let direction = obj['direction'];
                let invert_direction = obj['invert_direction'];
                
                $("#rm_" + direction + " textarea").val(text);
                $("#rm_" + direction + " .transcription").html(text);
                $("#rm_" + invert_direction + " .transcription").html($("#rm_" + invert_direction + " textarea").val());
                console.log("direction:" + direction + "; invert_direction: " + invert_direction + "; text: " + text);
            }
        });
        return false;
    };

    function rot13(string){
        return btoa(Array.from(string, (char, i) => string.charCodeAt(i)).join(","));
    };
    

});