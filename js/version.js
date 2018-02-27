
	/*
	Check the SECOND latest commit on github because the latest commit is updating ref_commit in this file.
	Next this file is reading comments from the latest commit (update ref_commit) eg. "New function - Update checker"
	*/
	
var dashticz_version = 'V2.1';
var dashticz_branch = 'beta'; /* master or beta */
var ref_commit = '59a7adfc7992b75877b3af45d465d0deb8b14172' /* Reference commit - add the latest commit BEFORE make a PR of this file */
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
	        $('body').append('<div class="update">' + language.misc.new_version + '!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/Dashticz/dashticz_v2/tree/' + dashticz_branch + '" target="_blank">' + language.misc.download + '</a>&nbsp;&nbsp;</div>');
    }
