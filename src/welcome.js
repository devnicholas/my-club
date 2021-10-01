const utils = require("./utils");

utils.layout.addClickEvent("importData", () => {
	const dataText = window.prompt("Cole aqui o texto copiado anteriormente");
	if (dataText) {
		const data = JSON.parse(dataText);
		utils.storage.setItemLocal("onboarding", true, false);
		utils.config.importData(data);
		location.href = "index.html";
	}
});

utils.layout.addClickEvent("saveConfigs", () => {
	const form = document.getElementById("onboarding");
	const club = form.elements["club"].value;
	const clubLong = form.elements["clubLong"].value;
	const configs = {
		club,
		clubLong,
	};
    utils.storage.setItemLocal("onboarding", true, false);
	utils.storage.setItemLocal("config", configs);
	location.href = "index.html";
});
