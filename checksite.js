(function() {

	// Get current url to check against user-set urls to be interrupted
	let currentURL = window.location.href;

	// Set styles to inject to center blocked site message
	let styles = document.createElement('style');
	styles.innerHTML = 
		"html, body {height: 100%; margin: 0; padding: 0; width: 100%;}" + 
		"body {display: table;}" +
		".parentDiv {display: table-cell; text-align: center; vertical-align: middle;}"

	// On successful storage retrieval, check if url matches any in user specified arrays
	// and take according action	
	let syncStoredItems = browser.storage.sync.get();
	syncStoredItems.then((res) => {
		let matchedParameterSet = res.userParameterSets.find(obj => matchesURL(obj.url));
		if (matchedParameterSet) {
			switch (matchedParameterSet.checktype) {
			case "block":
				blockSite(matchedParameterSet.message);
				break;
			case "remind": 
				console.log("This website should show a reminder thing");
				let reminderMessage = matchedParameterSet.message + "\n\nWould you like to proceed?";
				if (!confirm(reminderMessage)) {
					let blockMessage = "You chose to block this website after being reminded:<br><br>" + matchedParameterSet.message;
					blockSite(blockMessage);
				}
				break;
			}
		}
	});

	// Create regex and check for match against currentURL
	function matchesURL(matchString) {
		let matchRegEx = new RegExp(matchString.toLowerCase());
		return matchRegEx.test(currentURL.toLowerCase());
	}

	// Clear the document body and add a vertical and horizontally centered block message
	function 	blockSite(messageHTML) {
		let parentDiv = document.createElement("DIV");
		parentDiv.classList.add("parentDiv")
		let messageP = document.createElement("P");
		messageP.innerHTML = (messageHTML);
		parentDiv.appendChild(messageP);
		document.body.innerHTML = ""
		document.body.appendChild(styles);
		document.body.appendChild(parentDiv);
	}
})();