function getFullScreenIcon() {
    content = '<span data-id="fullscreen" class="fullscreen fullscreenicon text-right">' +
        '<em class="fa fa-expand" id="fullScreenToggleIcon" />' +
        '</span>';

    $(document).on('click', '#fullScreenToggleIcon', function () {
        toggleFullScreen(document.documentElement);
    });
    return content;
}

function isFullScreen() {
    return (document.fullScreenElement && document.fullScreenElement !== null)
        || document.mozFullScreen
        || document.webkitIsFullScreen;
}

function requestFullScreen(element) {
    fullScreenFunction = element.requestFullscreen
        || element.webkitRequestFullScreen
        || element.mozRequestFullScreen
        || element.msRequestFullscreen;

    fullScreenFunction.call(element);
}

function exitFullScreen() {
    exitFullScreenFunction = document.exitFullscreen
        || document.msExitFullscreen
        || document.mozCancelFullScreen
        || document.webkitExitFullscreen;

    exitFullScreenFunction.call(document);
}

function toggleFullScreen(element) {
    if (isFullScreen()) {
        exitFullScreen();
        $('#fullScreenToggleIcon').addClass('fa-expand').removeClass('fa-compress');
    }
    else {
        requestFullScreen(element || document.documentElement);
        $('#fullScreenToggleIcon').removeClass('fa-expand').addClass('fa-compress');
    }
}
