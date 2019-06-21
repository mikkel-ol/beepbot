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