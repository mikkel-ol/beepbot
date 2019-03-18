// Soundboard stuff
function boom() { send("boom"); }
function dontmess() { send("dontmess"); }
function bobby() { send("bobby"); }
function fuckaf() { send("fuckaf"); }
function huwa() { send("huwa"); }
function kylling() { send("kylling"); }
function ladvaer() { send("ladvaer"); }
function hejlasse() { send("hejlasse"); }
function waduhek1() { send("waduhek1"); }
function waduhek2() { send("waduhek2"); }
function waduhek3() { send("waduhek3"); }
function flytterrundt() { send("flytterrundt"); }
function muligt() { send("muligt"); }
function umuligt() { send("umuligt"); }

function stop() { send("stop"); }
function kill() { send("kill"); }










$( function() {
  $( ".draggable" ).draggable();
} );


function stopreveal() {
    if (logoClicked) {
        logoClicked = false;
        move('#logo')
            .x(0)
            .end();
        //document.getElementById("logo").style.filter = "none";
    }
    else {
        logoClicked = true;
        move('#logo')
            .y(-50)
            .x(-15)
            .rotate(-10)
            .end();
        //document.getElementById("logo").style.filter = "drop-shadow(1px 8px 5px #333)";
    }
}





function send(url) {
    sendRequest("GET", url, null, function(itemsText) {} );
}

// HTTP request shiet (thanks AU)
var http;
if (!XMLHttpRequest)
    http = new ActiveXObject("Microsoft.XMLHTTP");
else
    http = new XMLHttpRequest();

function sendRequest(httpMethod, url, body, responseHandler) {
    http.open(httpMethod, url);
    if (httpMethod == "POST") {
        http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    }
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            responseHandler(http.responseText);
        }
    };
    http.send(body);
}

var logoClicked;