var attempt = 3; // Variable to count number of attempts.
function validate() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	if (username == settings['user_name'] && password == settings['pass_word']) {
		var sessionTimeout = 1; //session timeout after x hours
		var loginDuration = new Date();
		loginDuration.setTime(loginDuration.getTime() + (sessionTimeout * 60 * 60 * 1000));
		document.cookie = "CrewCentreSession=Valid; " + loginDuration.toGMTString() + "; path=/";
		/* speak("Welcome back " + settings['user_name'] + " to Dashticz version 2") */
		document.location.href = document.location.href;
		return false;
	} else {
		attempt--;
		alert("You have left " + attempt + " attempt;");
		// Disabling fields after 3 attempts.
		if (attempt == 0) {
			document.getElementById("username").disabled = true;
			document.getElementById("password").disabled = true;
			document.getElementById("submit").disabled = true;
			return false;
		}
	}
}
function sessionValid() {
	if (settings['loginEnabled'] == true && document.cookie.indexOf("CrewCentreSession=Valid") == -1) {
		$('#loaderHolder').remove();
		$('.swiper-container').remove();
		document.body.style.backgroundImage = "url('" + settings['background_image'] + "')";
		document.body.style.backgroundSize = "cover";
		loginPage()
	}
}
function logout() {
  document.cookie = 'CrewCentreSession=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.location.href = document.location.href;
}

function loginPage() {
	
	var html = '<div class="modal fade" id="login" role="dialog" data-backdrop="static" data-keyboard="false">';
			html+='<div class="modal-dialog modal-login">';
				html+='<div class="modal-content content-login">';
					html+='<div class="login">';
						html+='<strong>'+ language.settings.general.Login_to_Dashticz + '</strong><br><br>';
						html+= '<input type="text" placeholder= "'+ language.settings.general.user_name + '" name="username" id="username"/><br>';
						html+= '<input type="password" placeholder= "'+ language.settings.general.pass_word + '" name="password" id="password" onkeypress="if(event.keyCode==13) {javascript:validate();}"/><br>';
						html+= '<input type="button" class="btn btn-secondary" value="'+ language.settings.general.login + '" id="submit" onclick="validate()"/>';
					html+='</div>';
				html+='</div>';
			html+='</div>';
		html+='</div><div class="login" data-toggle="modal" data-target="#login"><div>';
	
	$('body').append(html);
	setTimeout(function(){ 
		$('.login').trigger('click');		
		},1000);
}
