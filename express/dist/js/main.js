var guildID = "318685555997278210";
var xmlhttp;
if (!XMLHttpRequest)
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
else
    xmlhttp = new XMLHttpRequest();







$("#server-list .guild-container:nth-child(2)").children().first().addClass("selected");

function isSelected(element) {
  $(".guild").each( function() {
    $(this).removeClass("selected");
  } )
  $(element).parent().addClass("selected");
}

function play(file) {
  const url = "soundboard/play";
  const httpMethod = "POST";

  xmlhttp.open(httpMethod, url);
  if (httpMethod == "POST") xmlhttp.setRequestHeader("Content-Type", "application/json");

  xmlhttp.send(JSON.stringify({file: file}));
}

function changevc(vcID) {
  const url = "soundboard/changevc";
  const httpMethod = "POST";

  xmlhttp.open(httpMethod, url);
  if (httpMethod == "POST") xmlhttp.setRequestHeader("Content-Type", "application/json");

  xmlhttp.send(JSON.stringify({ guildID: guildID, vcID: vcID }));
}
