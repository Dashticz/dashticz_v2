
	/*
	Check the SECOND latest commit on github because the latest commit is updating ref_commit in this file.
	Next this file is reading comments from the latest commit (update ref_commit) eg. "New function - Update checker"
	*/
	
var dashticz_version = 'V2.3.3';
var dashticz_branch = 'master'; /* master or beta */
var ref_commit = 'a8d4897931a317f9f5a965f71466d4f62060b19f' /* Reference commit - add the latest commit BEFORE make a PR of this file */
var newVersion = '';
var moved = false;
	
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
