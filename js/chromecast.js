/**
 * The selected stream
 * @type {number}
 */
var selectedStreamIndex = 0;

function loadChromecast(columndiv) {
    head.load('https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1');

    var random = getRandomInt(1, 100000);
    var html = '<div data-id="chromecast" class="transbg containschromecast' + random + '">';
    html += '<div class="col-xs-12 transbg smalltitle"><h3></h3></div>';
    html += '<div class="col-xs-2 transbg hover text-center btnPrev">';
    html += '   <em class="fa fa-chevron-left fa-small"></em>';
    html += '</div>';
    html += '<div class="col-xs-2 transbg hover text-center btnNext">';
    html += '   <em class="fa fa-chevron-right fa-small"></em>';
    html += '</div>';
    html += '<div class="col-xs-4 transbg hover text-center cast-button-container">';
    html += '   <button class="cast-button" is="google-cast-button"></button>';
    html += '</div>';
    html += '<div class="col-xs-2 transbg hover text-center btnVolDown">';
    html += '   <em class="fa fa-volume-down fa-small"></em>';
    html += '</div>';
    html += '<div class="col-xs-2 transbg hover text-center btnVolUp">';
    html += '   <em class="fa fa-volume-up fa-small"></em>';
    html += '</div>';
    html += '</div>';
    $(columndiv).append(html);

    window['__onGCastApiAvailable'] = function (isAvailable) {
        if (isAvailable) {
            cast.framework.CastContext.getInstance().setOptions({
                receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
                autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
            });

            var context = cast.framework.CastContext.getInstance();
            context.addEventListener(
                cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
                function (event) {
                    switch (event.sessionState) {
                        case cast.framework.SessionState.SESSION_STARTED:
                            log('CastContext: CastSession started');
                            loadStream(_STREAMPLAYER_TRACKS[selectedStreamIndex].file);

                            break;
                        case cast.framework.SessionState.SESSION_RESUMED:
                            log('CastContext: CastSession resumed');
                            break;
                        case cast.framework.SessionState.SESSION_ENDED:
                            log('CastContext: CastSession disconnected');
                            // Update locally as necessary
                            break;
                    }
                })
            selectStream('.containschromecast' + random);
        }
    };
}

function loadStream(currentMediaURL) {
    var contentType = 'audio/mp3';
    var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    var mediaInfo = new chrome.cast.media.MediaInfo(currentMediaURL, contentType);
    var request = new chrome.cast.media.LoadRequest(mediaInfo);

    if (castSession !== null) {
        castSession.loadMedia(request).then(
            function () {
                log('Load succeed: ' + currentMediaURL);
            },
            function (errorCode) {
                log('Error code: ' + errorCode);
            });
    }
}

function changeVolume(action) {
    var castSession = cast.framework.CastContext.getInstance().getCurrentSession();
    if (castSession !== null) {
        var volume = castSession.getVolume();
        log('Volume: ' + volume);
        if (action === 'up') {
            castSession.setVolume(volume + 0.02);
        } else {
            castSession.setVolume(volume - 0.02);
        }
    }
}

function selectStream(streamelement) {
    var trackCount = _STREAMPLAYER_TRACKS.length,
        titleElement = $(streamelement + ' h3');
    $(streamelement + ' .btnPrev').click(function () {
        selectedStreamIndex--;
        if (selectedStreamIndex < 0) {
            selectedStreamIndex = trackCount - 1;
        }
        loadTrack(selectedStreamIndex);
    });
    $(streamelement + ' .btnNext').click(function () {
        selectedStreamIndex++;
        if (selectedStreamIndex === trackCount) {
            selectedStreamIndex = 0;
        }

        loadTrack(selectedStreamIndex);
    });
    $(streamelement + ' .btnVolDown').click(function () {
        changeVolume('down');
    });
    $(streamelement + ' .btnVolUp').click(function () {
        changeVolume('up');
    });
    var loadTrack = function (id) {
        titleElement.text(_STREAMPLAYER_TRACKS[id].name);
        loadStream(_STREAMPLAYER_TRACKS[id].file);
    };
    loadTrack(selectedStreamIndex);
}

