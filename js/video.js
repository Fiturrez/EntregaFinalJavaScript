let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: 'UIn_cfrVmFE', // ID del video
        playerVars: {
            'autoplay': 1, 
            'mute': 1 
        }
    });
}