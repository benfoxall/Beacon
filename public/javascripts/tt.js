$(function(){
    $('input#key').keyup(function(event){
        var k = $('input').val().split(/[^A-z0-9]/).join('');
        $('.k').text(k);
        $('.keylink').attr('href','/tt/' + k)
    }).focus();
    
    if(window.ttKey){
        // alert("load")
        var client = new Faye.Client('http://localhost:3000/faye');
        client.subscribe('/' + ttKey, function(message) {
            $('#tt').append($('<li>').text(message.text))
          alert('Got a message: ' + message.text);
        });
        
        console.log("Subscribed", '/' + ttKey);
    }
    
    if($('#tt').size() > 0){
        $('#tt').append('<li>ok</li>')
    }
})