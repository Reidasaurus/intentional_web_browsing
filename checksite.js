(function() {

	let currentURL = window.location.href;
	let syncStoredItems = browser.storage.sync.get();
	let styles = document.createElement('style');
	styles.innerHTML = 
		"html, body {height: 100%; margin: 0; padding: 0; width: 100%;}" + 
		"body {display: table;}" +
		".parentDiv {display: table-cell; text-align: center; vertical-align: middle;}"
	syncStoredItems.then((res) => {
		let hrefString = "<h1>Current url: " + currentURL + "<h1>"
		blockSite(res.blockMessage);
		
		// res.reminderSiteStrings.forEach((val) => {
		// 	let h1String = "<h1>" + val + "</h1>";
		// 	document.body.innerHTML += h1String;
		// })
	});

	function 	blockSite(message) {
		let parentDiv = document.createElement("DIV");
		parentDiv.classList.add("parentDiv")
		let messageP = document.createElement("P");
		let messageText = document.createTextNode(message);
		messageP.appendChild(messageText);
		parentDiv.appendChild(messageP);
		document.body.innerHTML = ""
		document.body.appendChild(styles);
		document.body.appendChild(parentDiv);
	}

	function blockSiteIfListed(blockAry, blockMessage) {

	}

	

})();