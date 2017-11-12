function getFullScreenIcon(columndiv) {
    $(columndiv).append(
        '<div data-id="fullscreen" class="fullscreen fullscreenicon col-xs-2 text-right">' +
        '<em class="fa fa-expand" id="fullScreenToggleIcon" />' +
        '</div>'
    );
    $('#fullScreenToggleIcon').on("click", function() {
        toggleFullScreen(document.documentElement);
    });
}

function isFullScreen()
{
    return (document.fullScreenElement && document.fullScreenElement !== null)
        || document.mozFullScreen
        || document.webkitIsFullScreen;
}

function requestFullScreen(element)
{
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

function toggleFullScreen(element)
{
    if (isFullScreen())
        exitFullScreen();
    else
        requestFullScreen(element || document.documentElement);

    $('#fullScreenToggleIcon').toggleClass('fa-expand').toggleClass('fa-compress');
}