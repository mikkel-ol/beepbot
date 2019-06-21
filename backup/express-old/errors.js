server.use((req, res) => {
	res.status(404);
	res.sendFile(__dirname + '/views/404.html');
})
server.use((req, res) => {
	res.status(500);
	res.sendFile(__dirname + '/views/500.html');
})