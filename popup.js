document.addEventListener('DOMContentLoaded', function() {
  var sendMessage = document.getElementById('sendMessage');
  sendMessage.addEventListener('click', function() {
	$.ajax({
		type: "GET",
		url: "https://api.github.com/repos/mbauer2/rayTracer/contents/README.md",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (data, statuis, jqXHR) {
			var sendMessage = document.getElementById('sendMessage');
			var cont = atob(data["content"])
			sendMessage.innerHTML = cont;
		}
	});
	

  }, false);
}, false);

