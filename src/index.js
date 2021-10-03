const utils = require("./utils");

document.addEventListener("DOMContentLoaded", function () {
	if (document.getElementById("welcome")) {
		require("./welcome");
	} else {
		if (!utils.storage.getItemLocal("onboarding", false))
			location.href = "welcome.html";

		const configs = utils.storage.getItemLocal("config");
		if (configs.clubLong)
			document.getElementById("myClub").innerHTML = configs.clubLong;

		if (document.getElementById("homepage")) {
			require("./homepage");
		} else if (document.getElementById("configuration-page")) {
			require("./configuration");
		} else if (document.getElementById("notes-page")) {
			require("./notes");
		}
	}
});
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("sw.js");
}
