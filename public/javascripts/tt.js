$(function(){
    var host = window.location.host;
    
    $('.host').text(host);

    $('input#key').keyup(function(event){
        var k = $('input').val().split(/[^A-z0-9]/).join('');
        $('.k').text(k);
        $('.keylink').attr('href','/tt/' + k)
    }).focus();

    if(window.ttKey){
        var client = new Faye.Client('http://'+host+'/faye');
        client.subscribe('/' + ttKey, function(message) {
            $('#tt').append($('<li>').text(message.text))
            alert('Got a message: ' + message.text);
        });
    }
})
