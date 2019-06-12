httpGetAsync('/serverlist', callbackServerlist);

function vueTest(retArray) {
	let serverlist = new Vue({
		el: '.container',
		data: {
			servers: retArray
		}
	})
}

function callbackServerlist(res) {
	const resObj = JSON.parse(res);
	const retArray = [];

	for (let server in resObj) {
		retArray.push({
			name: resObj[server].name,
			iconURL: resObj[server].icon
		})
	}

	// Return retArray
	//vueTest(retArray);
}

function httpGetAsync(url, callback)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);

    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            return callback(xmlHttp.responseText);
    }
}