document.addEventListener('DOMContentLoaded', function() {
  var sendMessage = document.getElementById('sendMessage');
  sendMessage.addEventListener('click', function() {
    var message = $('form').serializeArray()
	message = message[0]["value"];
	$('form')[0].trigger("reset");
	addMessage(message);

  }, false);
}, false);

function addMessage(message){
    $.ajax({
		type: "GET",
		url: "https://api.github.com/repos/mbauer2/rayTracer/contents/README.md",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (return_data, status, jqXHR) {
			var cont = atob(return_data["content"]);
			cont += "\n" + message;
			var newCont = btoa(cont);
			var newData = {"message":"GitServed commit", "content": newCont, "sha":return_data["sha"]}
			$.ajax({
		        type: "PUT",
		        url: "https://api.github.com/repos/mbauer2/rayTracer/contents/README.md",
				beforeSend: function(xhr){
				    xhr.setRequestHeader("Authorization", "Basic " + btoa("<YOUR USERNAME>:<YOUR PASSWORD>"));
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
    $.ajax({
		type: "GET",
		url: "https://api.github.com/repos/mbauer2/rayTracer/contents/README.md",
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