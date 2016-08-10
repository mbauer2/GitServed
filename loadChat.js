document.addEventListener('DOMContentLoaded', function() {
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
}, false);

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