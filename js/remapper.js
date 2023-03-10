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

    var gib = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "e", "b", "d", "u", "i", "k", "Q", "E", "w", "h", "c", "m", "n", "o", "p", "C", "r", "L", "t", "Y", "l", "v", "s", "y", "&", "K", "O", "A", "%", "N", "Z", "H", "T", "J", "a", "_", "I", "B", "U", "F", "G", "z", "V", "R", "$", "M", "P", "f", "S", "W", "D", "g", "/", "~", "\\", ".", "|", ",", " ", ":", "!", "¯", "-", "«", "⅄", "Ⅺ", "⸘", "‽", "¿", "?", "!", "*", "+", ];
    var nor = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "ð", "ø", "č", "ķ", "ŋ", "θ", "ţ", "ť", "ž", "ǆ", "ǥ", "ǧ", "ǩ", "ɒ", "ə", "ɢ", "ɣ", "ɬ", "ɮ", "ɴ", "ʁ", "π", "φ", "χ", "ẅ", "’", "'", "š", ":", "\"", "/", "“", ".", "^", " ", ",", "!", "−", "-", "«", "Y", "X", "⸘", "‽", "¿", "?", "!", "*", "+" ];
    $.each (gib, function( indexes, values ) {
        if (values == " "){
            desc = 'space'
        } else {
            desc = values
        }
        $(".rm_gibberish_map").append("<div class='char' data-char='" + values + "' data-gibberish-or-normal=><span>" + values + "</span><i>" + desc + "</i></div>");
    });
    $.each (nor, function( indexes, values ) {
        if (values == " "){
            desc = 'space'
        } else {
            desc = values
        }
        $(".rm_normal_map").append("<div class='char' data-char='" + values + "' data-gibberish-or-normal=><span>" + values + "</span><i>" + desc + "</i></div>");
    });

    $('.char').on("click", function() {
        let direction = $(this).parent().data("gibberish-or-normal")
        let value = $(this).find('span').text();
        let textarea = $("#rm_" + direction + " textarea");
        textarea.val(textarea.val() + value);
        transcript_it(direction);
    });

    function transcript_it(gibberish_or_normal){

        let textarea = $("#rm_"+ gibberish_or_normal +" textarea")
        let value_to_send = rot13(textarea.val().replace(/["]/g,'\\"'));
        $.ajax({
            url: url,
            type: "POST",
            data: {t: value_to_send, d: gibberish_or_normal, v: 2},
            success: function(response){
                let obj = JSON.parse(response);
                let text = String.fromCharCode.apply(null, obj['text']);
                let direction_from = obj['direction_from'];
                let direction_to = obj['direction_to'];

                console.log("obj: " + obj);
                console.log("direction_from: " + direction_from);
                console.log("direction_to: " + direction_to);
                console.log("text: " + text);

                $("#rm_" + direction_to + " textarea").val(text);
                $("#rm_" + direction_to + " .transcription").html(text);
                $("#rm_" + direction_from + " .transcription").html($("#rm_" + direction_from + " textarea").val());
            }
        });
        return false;
    }

    function rot13(string){
        return btoa(Array.from(string, (char, i) => string.charCodeAt(i)).join(","));
    }


});