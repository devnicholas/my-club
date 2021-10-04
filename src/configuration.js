const utils = require("./utils");

const configs = utils.storage.getItemLocal("config");
const form = document.getElementById("configurations");
form.elements["clubLong"].value = configs.clubLong || '';
form.elements["club"].value = configs.club || '';
utils.layout.addClickEvent("saveConfigs", () => {
	const club = form.elements["club"].value;
	const clubLong = form.elements["clubLong"].value;
	const configs = {
		club,
		clubLong,
	};
	utils.storage.setItemLocal("config", configs);
    location.reload()
});
utils.layout.addClickEvent("tab-club", () => {
	utils.layout.toggleTab("tab-club");
});
utils.layout.addClickEvent("tab-export", () => {
	utils.layout.toggleTab("tab-export");
});
utils.layout.addClickEvent("exportData", () => {
	const data = utils.config.exportData()
    utils.config.copyText(data)
    alert('Texto copiado para a área de transferência')
});
utils.layout.addClickEvent("importData", () => {
    const dataText = window.prompt("Cole aqui o texto copiado anteriormente");
    const data = JSON.parse(dataText)
    if(window.confirm('Ao importar esses dados eles substituirão todos os já armazenados aqui. Deseja continuar?')){
        utils.config.importData(data)
        location.reload()
    }
});
utils.layout.addClickEvent("cleanData", () => {
	if(window.confirm('Esta é uma ação irreversível. Você tem certeza?')){
        utils.storage.removeAll()
        location.reload()
    }
});
function copy(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}
