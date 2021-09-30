const utils = require("./utils");

const configs = utils.storage.getItemLocal("config");
const form = document.getElementById("configurations");
form.elements["clubLong"].value = configs.clubLong;
form.elements["club"].value = configs.club;
utils.layout.addClickEvent("saveConfigs", () => {
	const club = form.elements["club"].value;
	const clubLong = form.elements["clubLong"].value;
	const configs = {
		club,
		clubLong,
	};
	utils.storage.setItemLocal("config", configs);
});
utils.layout.addClickEvent("tab-club", () => {
	utils.layout.toggleTab("tab-club");
});
utils.layout.addClickEvent("tab-export", () => {
	utils.layout.toggleTab("tab-export");
});
