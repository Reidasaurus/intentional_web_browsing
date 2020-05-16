(function() {

	let currentURL = window.location.href;
	let syncStoredItems = browser.storage.sync.get();

	// Set styles to inject to center blocked site message
	let styles = document.createElement('style');
	styles.innerHTML = 
		"html, body {height: 100%; margin: 0; padding: 0; width: 100%;}" + 
		"body {display: table;}" +
		".parentDiv {display: table-cell; text-align: center; vertical-align: middle;}"

	// On successful storage retrieval, check if url matches any in user specified arrays
	// and take according action	
	syncStoredItems.then((res) => {
		// Blocked site check
		if (res.blockedSiteStrings.some(matchURL)) {
			blockSite(res.blockMessage);
		} 
		// Reminder site check
		else if (res.reminderSiteStrings.some(matchURL)) {
			alert(res.reminderMessage);
		}
	});

	// Create regex and check for match against currentURL
	function matchURL(matchString) {
		let matchRegEx = new RegExp(matchString);
		return matchRegEx.test(currentURL);
	}

	// Clear the document body and add a vertical and horizontally centered block message
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
})();