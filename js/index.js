var selectedTab = "All";

var channels = ["jahrein", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(document).ready(function () {
    for (let i = 0; i < channels.length; i++) {
        $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/"+channels[i]+"?callback=?", function (data) {
            if(data.stream!=null){
                //add to online tab
                createChannel(channels[i], "online");
            }
            else{
                //ofline tab
                createChannel(channels[i], "offline");
            }
        });
    }
});

$(".allTab").click(function () {    //filter streams
    if(selectedTab!="All"){
        $(".onStream").show(100);
        $(".offStream").show(100);
        selectedTab='All';
    }
});

$(".onTab").click(function () {
    if(selectedTab!="On"){
        $(".offStream").hide(100);
        $(".onStream").show(100);
        selectedTab = 'On';
    }
});

$(".offTab").click(function () {
    if(selectedTab!="Off"){
        $(".onStream").hide(100);
        $(".offStream").show(100);
        selectedTab = 'Off';
    }

});

function createChannel(chName, status){
    $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/"+chName+"?callback=?", function (data) {
            if(status==="online"){
                $(".onChannels").append("<a href='"+data.url+"' target='blank'<div class='onStream'>"
                +"<img class='strlogo'  src='"+data.logo+"' height='75' width='75'>"
                +"<p class='strTitle'>"+data.display_name+"</p>"
                +"<p class='strSubtitle'>"+data.status+"</p></div></a>");
            }
            else{
                $(".offChannels").append("<a href='"+data.url+"' target='blank'<div class='offStream'>"
                +"<img class='strlogo'  src='"+data.logo+"' height='75' width='75'>"
                +"<p class='strTitle'>"+data.display_name+"</p>"
                +"<p class='strSubtitle'>"+data.status+"</p></div></a>");
            }
        }
    );
}