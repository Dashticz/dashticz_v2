
	/*
	Check the SECOND latest commit on github because the latest commit is updating ref_commit in this file.
	Next this file is reading comments from the latest commit (update ref_commit) eg. "New function - Update checker"
	*/
	
var dashticz_version = 'V2.3.5';
var dashticz_branch = 'beta'; /* master or beta */
var ref_commit = '2dc5f130afad00d852b8427cc8f3bbc7f6eefacb' /* Reference commit - add the latest commit BEFORE make a PR of this file */
var newVersion = '';
var moved = false;
var domoversion = '';
var dzVents = '';
var python = '';
var levelNamesEncodeVersion = '3.9476'
	
$.ajax({url: 'https://api.github.com/repos/Dashticz/dashticz_v2/branches/' + dashticz_branch, async: false, dataType: 'json', success: function(data) {
	
	dashticz_branch = data['name']
	var message = 'Last change made: ' + data['commit']['commit']['message'];
	
	if (ref_commit !== data['commit']['parents'][0]['sha']) {
		moved = true;
		newVersion = '<br><i>New version is available! <a href="https://github.com/Dashticz/dashticz_v2/tree/' + dashticz_branch + '" target="_blank">Click here to download</a></i><br><i>' + message + '</i>';
	}
	else if (ref_commit === data['commit']['parents'][0]['sha']) {
		moved = false;
		newVersion = '<br><i>You are running latest version.</i>';
	}
}
});

if (moved == true) {
	infoMessage(language.misc.new_version + '!' , '<a href="https://github.com/Dashticz/dashticz_v2/tree/' + dashticz_branch + '" target="_blank">' + language.misc.download + '</a>');
}

$.ajax({url: config['domoticz_ip'] + '/json.htm?username=' + window.btoa(config['user_name']) + '&password=' + window.btoa(config['pass_word']) + '&type=command&param=getversion', async: false, dataType: 'json', success: function(data) {
	
	domoversion = 'Domoticz version: ' + data.version;
	dzVents = '<br>dzVents version: ' + data.dzvents_version;
	python = '<br> Python version: ' + data.python_version;
	console.log(data);
}
});
