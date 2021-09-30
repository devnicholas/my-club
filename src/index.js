const utils = require("./utils");


document.addEventListener("DOMContentLoaded", function () {
    const configs = utils.storage.getItemLocal('config')
    if(configs.clubLong) document.getElementById('myClub').innerHTML = configs.clubLong
	
    if (document.getElementById('homepage')) {
        require("./homepage")
	} else if(document.getElementById('configuration-page')) {
        require("./configuration")
    }
});
