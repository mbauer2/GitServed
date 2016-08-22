document.addEventListener('DOMContentLoaded', function() {
  var sendMessage = document.getElementById('sendMessage');
  sendMessage.addEventListener('click', function() {
    var message = $('#userInput').serializeArray()
    message = message[0]["value"];
    if (message == ""){
        loadChat();
        return;
    }
    var myform = document.getElementById('userInput');
    myform.reset();
    addMessage(message);
  }, false);
  
  var saveInfo = document.getElementById('saveInfo');
  saveInfo.addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var token = document.getElementById('token').value;
    var infoform = document.getElementById('userInfo');
    infoform.reset();
    window.name = JSON.stringify({"username": username, "token": token, "sha": ""})
  }, false);
  
}, false);

function addMessage(message){
    getFile(function (return_data, status, jqXHR) {
            var owner = document.getElementById('owner').value;
            var repo = document.getElementById('repo').value;
            var cookieData = JSON.parse(window.name); //parse once 
            var username = cookieData["username"];
            var token = cookieData["token"];
            var fileContent = atob(return_data["content"]);
            var updatedContent = fileContent.concat("\n" + username + ": " + message);
            var newData = {"message":"GitServed commit", "content": btoa(updatedContent), "sha":return_data["sha"]}
            $.ajax({
                type: "PUT",
                url: "https://api.github.com/repos/" + owner +"/" + repo + "/contents/README.md",
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Authorization", "Token " + token);
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(newData),
                success: loadChat
            });
       });
}

function loadChat(){
   getFile(function (data, statuis, jqXHR) {
            var chatText = document.getElementById('chatText');
            var cont = atob(data["content"])
            cont = cont.replace(/[\r\n]/g, "<br />");
            chatText.innerHTML = cont;
        });
}

function getFile(callback) {
    var owner = document.getElementById('owner').value;
    var repo = document.getElementById('repo').value;
    $.ajax({
        type: "GET",
        url: "https://api.github.com/repos/" + owner + "/" + repo + "/contents/README.md",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback
    });
}