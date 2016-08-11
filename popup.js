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
    var user = document.getElementById('username').value;
	var pass = document.getElementById('pass').value;
	var infoform = document.getElementById('userInfo');
	infoform.reset();
	window.name = JSON.stringify({"username": user, "password": pass, "sha": ""})
  }, false);
  
}, false);

function addMessage(message){
    var owner = document.getElementById('owner').value;
	var repo = document.getElementById('repo').value;
    $.ajax({
		type: "GET",
		url: "https://api.github.com/repos/" + owner + "/" + repo + "/contents/README.md",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (return_data, status, jqXHR) {
			var cont = atob(return_data["content"]);
			cont += "\n" + JSON.parse(window.name)["username"] + ": " + message;
			var newCont = btoa(cont);
			var newData = {"message":"GitServed commit", "content": newCont, "sha":return_data["sha"]}
			var user = JSON.parse(window.name)["username"];
			var pass = JSON.parse(window.name)["password"];
			$.ajax({
		        type: "PUT",
		        url: "https://api.github.com/repos/" + owner +"/" + repo + "/contents/README.md",
				beforeSend: function(xhr){
				    xhr.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + pass));
				},
		        contentType: "application/json; charset=utf-8",
		        dataType: "json",
				data: JSON.stringify(newData),
		        success: function (return_data2, status2, jqXHR2) {
		        	loadChat();
        		}
	        });
		}
	});
}

function loadChat(){
    var owner = document.getElementById('owner').value;
	var repo = document.getElementById('repo').value;
    $.ajax({
		type: "GET",
		url: "https://api.github.com/repos/" + owner + "/" + repo + "/contents/README.md",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data, statuis, jqXHR) {
			var chatText = document.getElementById('chatText');
			var cont = atob(data["content"])
			cont = cont.replace(/[\r\n]/g, "<br />");
			chatText.innerHTML = cont;
		}
	});

}