var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-embed-iframe", {
        videoId: "EyXuvP3CKzY",
        events: {
            onReady: onPlayerReady,
        },
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function showVideo() {
    document.getElementById("youtube-link").style.display = "none";
    document.getElementById("youtube-embed-iframe").style.display = "block";
    document.getElementById("youtube-thumb").style.display = "none";
    let ifr = document.getElementById("youtube-embed-iframe");
    ifr.setAttribute("src", ifr.getAttribute("data-src"));
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
