/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/configuration.js":
/*!******************************!*\
  !*** ./src/configuration.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n\r\nconst configs = utils.storage.getItemLocal(\"config\");\r\nconst form = document.getElementById(\"configurations\");\r\nform.elements[\"clubLong\"].value = configs.clubLong || '';\r\nform.elements[\"club\"].value = configs.club || '';\r\nutils.layout.addClickEvent(\"saveConfigs\", () => {\r\n\tconst club = form.elements[\"club\"].value;\r\n\tconst clubLong = form.elements[\"clubLong\"].value;\r\n\tconst configs = {\r\n\t\tclub,\r\n\t\tclubLong,\r\n\t};\r\n\tutils.storage.setItemLocal(\"config\", configs);\r\n    location.reload()\r\n});\r\nutils.layout.addClickEvent(\"tab-club\", () => {\r\n\tutils.layout.toggleTab(\"tab-club\");\r\n});\r\nutils.layout.addClickEvent(\"tab-export\", () => {\r\n\tutils.layout.toggleTab(\"tab-export\");\r\n});\r\nutils.layout.addClickEvent(\"exportData\", () => {\r\n\tconst data = utils.config.exportData()\r\n    window.prompt(\"Copie o texto abaixo e lembre-se de salvar em um lugar seguro ;)\", data);\r\n});\r\nutils.layout.addClickEvent(\"importData\", () => {\r\n    const dataText = window.prompt(\"Cole aqui o texto copiado anteriormente\");\r\n    const data = JSON.parse(dataText)\r\n    if(window.confirm('Ao importar esses dados eles substituirão todos os já armazenados aqui. Deseja continuar?')){\r\n        utils.config.importData(data)\r\n        location.reload()\r\n    }\r\n});\r\nutils.layout.addClickEvent(\"cleanData\", () => {\r\n\tif(window.confirm('Esta é uma ação irreversível. Você tem certeza?')){\r\n        utils.storage.removeAll()\r\n        location.reload()\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack://my-club/./src/configuration.js?");

/***/ }),

/***/ "./src/homepage.js":
/*!*************************!*\
  !*** ./src/homepage.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\nfunction init() {\r\n\tconst calendarEl = document.getElementById(\"calendar\");\r\n\tconst events = utils.data.getAllEvents();\r\n\tconst calendar = new FullCalendar.Calendar(calendarEl, {\r\n\t\tinitialView: \"listYear\",\r\n\t\tevents,\r\n\t\theaderToolbar: {\r\n\t\t\tright: \"prev,next\",\r\n\t\t\tleft: \"title\",\r\n\t\t},\r\n\t\tviews: {\r\n\t\t\tdayGridMonth: {\r\n\t\t\t\ttitleFormat: {\r\n\t\t\t\t\tmonth: \"long\",\r\n\t\t\t\t\tyear: \"numeric\",\r\n\t\t\t\t},\r\n\t\t\t},\r\n\t\t\tlistYear: {\r\n\t\t\t\ttitleFormat: {\r\n\t\t\t\t\tyear: \"numeric\",\r\n\t\t\t\t},\r\n\t\t\t},\r\n\t\t},\r\n\t\teventClick: function (info) {\r\n\t\t\tutils.events.editEvent(info.event.id);\r\n\t\t},\r\n\t});\r\n\r\n\tcalendar.setOption(\"locale\", \"pt-BR\");\r\n\tcalendar.render();\r\n\r\n\tutils.layout.addClickEvent(\"openNewEventModal\", () => {\r\n\t\tutils.layout.toggleModal(\"modal-new-event\");\r\n\t});\r\n\tutils.layout.addClickEvent(\"closeNewEventModal\", () => {\r\n\t\tutils.layout.toggleModal(\"modal-new-event\");\r\n\t});\r\n\tutils.layout.addClickEvent(\"saveNewEvent\", () => {\r\n\t\tconst event = utils.events.formatEvent(\"newEvent\");\r\n\t\tutils.data.newEvent(event);\r\n\t\tcalendar.addEvent(event);\r\n\t\tutils.layout.toggleModal(\"modal-new-event\");\r\n\t});\r\n\tutils.layout.addClickEvent(\"listYear\", () => {\r\n\t\tcalendar.changeView(\"listYear\");\r\n\t});\r\n\tutils.layout.addClickEvent(\"dayGridMonth\", () => {\r\n\t\tcalendar.changeView(\"dayGridMonth\");\r\n\t});\r\n\tutils.layout.addClickEvent(\"closeEditEventModal\", () => {\r\n\t\tutils.layout.toggleModal(\"modal-edit-event\");\r\n\t});\r\n\tutils.layout.addClickEvent(\"deleteEvent\", () => {\r\n\t\tconst eventData = utils.events.formatEvent(\"editEvent\");\r\n\t\tconst event = calendar.getEventById(eventData.id);\r\n\t\tevent.remove();\r\n\t\tutils.data.removeEvent(eventData);\r\n\t\tutils.layout.toggleModal(\"modal-edit-event\");\r\n\t});\r\n\tutils.layout.addClickEvent(\"saveEvent\", () => {\r\n\t\tconst eventData = utils.events.formatEvent(\"editEvent\");\r\n\t\tconst event = calendar.getEventById(eventData.id);\r\n\t\tevent.setProp(\"title\", eventData.title);\r\n\t\tevent.setStart(eventData.start, { maintainDuration: true });\r\n\t\tutils.data.editEvent(eventData);\r\n\t\tutils.layout.toggleModal(\"modal-edit-event\");\r\n\t});\r\n}\r\n\r\nmodule.exports = init();\r\n\n\n//# sourceURL=webpack://my-club/./src/homepage.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n\tif (document.getElementById(\"welcome\")) {\r\n\t\t__webpack_require__(/*! ./welcome */ \"./src/welcome.js\");\r\n\t} else {\r\n\t\tif (!utils.storage.getItemLocal(\"onboarding\", false))\r\n\t\t\tlocation.href = \"welcome.html\";\r\n\r\n\t\tconst configs = utils.storage.getItemLocal(\"config\");\r\n\t\tif (configs.clubLong)\r\n\t\t\tdocument.getElementById(\"myClub\").innerHTML = configs.clubLong;\r\n\r\n\t\tif (document.getElementById(\"homepage\")) {\r\n\t\t\t__webpack_require__(/*! ./homepage */ \"./src/homepage.js\");\r\n\t\t} else if (document.getElementById(\"configuration-page\")) {\r\n\t\t\t__webpack_require__(/*! ./configuration */ \"./src/configuration.js\");\r\n\t\t} else if (document.getElementById(\"notes-page\")) {\r\n\t\t\t__webpack_require__(/*! ./notes */ \"./src/notes.js\");\r\n\t\t}\r\n\t}\r\n});\r\n\n\n//# sourceURL=webpack://my-club/./src/index.js?");

/***/ }),

/***/ "./src/notes.js":
/*!**********************!*\
  !*** ./src/notes.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n\r\nconst notes = utils.storage.getItemLocal(\"notes\");\r\nconst form = document.getElementById(\"noteForm\");\r\nnotes.map((note) => {\r\n\tconst notesList = document.getElementById(\"notes-list\");\r\n\tconst tempContent = notesList.innerHTML;\r\n\tconst content =\r\n\t\ttempContent +\r\n\t\t`\r\n    <div class=\"flex justify-between py-2 border-b border-gray-500\">\r\n        <p class=\"font-medium text-lg self-center\">${note.title}</p>\r\n        <div class=\"w-100 flex\">\r\n            <button class=\"btn btn-blue self-center mr-1 editNote\" data-id=\"${note.id}\">Editar</button>\r\n            <button class=\"btn btn-red self-center removeNote\" data-id=\"${note.id}\">Excluir</button>\r\n        </div>\r\n    </div>`;\r\n\tnotesList.innerHTML = content;\r\n});\r\n\r\nutils.layout.addClickEvent(\"openModal\", () => {\r\n    form.reset();\r\n\tutils.layout.toggleModal(\"modal-note\");\r\n});\r\nutils.layout.addClickEvent(\"closeModal\", () => {\r\n\tform.reset();\r\n\tutils.layout.toggleModal(\"modal-note\");\r\n});\r\nutils.layout.addClickEvent(\"saveNote\", () => {\r\n\tconst id =\r\n\t\tform.elements[\"id\"].value === \"\"\r\n\t\t\t? utils.storage.generateUuid()\r\n\t\t\t: form.elements[\"id\"].value;\r\n\tconst title = form.elements[\"title\"].value;\r\n\tconst note = form.elements[\"note\"].value;\r\n\tconst data = {\r\n\t\tid,\r\n\t\ttitle,\r\n\t\tnote,\r\n\t};\r\n    if(form.elements[\"id\"].value === \"\"){\r\n        notes.push(data);\r\n        utils.storage.setItemLocal(\"notes\", notes);\r\n    }else{\r\n        const newNotes = notes.map((note) => {\r\n            return note.id === data.id ? data : note\r\n        })\r\n        utils.storage.setItemLocal(\"notes\", newNotes);\r\n    }\r\n\tform.reset();\r\n\tlocation.reload();\r\n});\r\n\r\nutils.layout.addClickEvents(\"editNote\", (event) => {\r\n\tconst id = event.target.getAttribute(\"data-id\");\r\n\tconst data = utils.data.findNote(id);\r\n\tform.elements[\"id\"].value = data.id;\r\n\tform.elements[\"title\"].value = data.title;\r\n\tform.elements[\"note\"].value = data.note;\r\n\tutils.layout.toggleModal(\"modal-note\");\r\n});\r\nutils.layout.addClickEvents(\"removeNote\", (event) => {\r\n\tconst id = event.target.getAttribute(\"data-id\");\r\n\tconst newNotes = notes.filter((note) => {\r\n\t\treturn note.id !== id;\r\n\t});\r\n\tutils.storage.setItemLocal(\"notes\", newNotes);\r\n    location.reload()\r\n});\r\n\n\n//# sourceURL=webpack://my-club/./src/notes.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("const storage = {\r\n\tsetItemLocal: (key, value, isObject = true) => {\r\n\t\treturn localStorage.setItem(\r\n\t\t\t`my-club__${key}`,\r\n\t\t\tisObject ? JSON.stringify(value) : value\r\n\t\t);\r\n\t},\r\n\tgetItemLocal: (key, isObject = true) => {\r\n\t\tconst value = localStorage.getItem(`my-club__${key}`);\r\n\t\tif (!value) return isObject ? [] : null;\r\n\t\treturn isObject ? JSON.parse(value) : value;\r\n\t},\r\n\tgenerateUuid: () => {\r\n\t\treturn \"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\".replace(\r\n\t\t\t/[xy]/g,\r\n\t\t\tfunction (c) {\r\n\t\t\t\tvar r = (Math.random() * 16) | 0,\r\n\t\t\t\t\tv = c == \"x\" ? r : (r & 0x3) | 0x8;\r\n\t\t\t\treturn v.toString(16);\r\n\t\t\t}\r\n\t\t);\r\n\t},\r\n\tremoveAll: () => {\r\n\t\tlocalStorage.clear();\r\n\t},\r\n};\r\n\r\nconst layout = {\r\n\ttoggleClass: (id, className) => {\r\n\t\tconst el = document.getElementById(id);\r\n\t\tel.classList.toggle(className);\r\n\t},\r\n\tremoveClass: (id, className) => {\r\n\t\tconst el = document.getElementById(id);\r\n\t\tel.classList.remove(className);\r\n\t},\r\n\taddClickEvent: (id, callback) => {\r\n\t\tconst el = document.getElementById(id);\r\n\t\tel.addEventListener(\"click\", callback);\r\n\t},\r\n\taddClickEvents: (id, callback) => {\r\n\t\tconst elements = document.getElementsByClassName(id);\r\n\t\tfor (var i=0, max=elements.length; i < max; i++) {\r\n\t\t\telements[i].addEventListener(\"click\", callback);\r\n\t   }\r\n\t},\r\n\ttoggleModal: (id) => {\r\n\t\tlayout.toggleClass(id, \"hidden\");\r\n\t\tlayout.toggleClass(id, \"fixed\");\r\n\t},\r\n\ttoggleTab: (tabName) => {\r\n\t\tconst containers = document.getElementsByClassName(\"tab-container\");\r\n\t\tArray.from(containers).forEach((el) => {\r\n\t\t\tel.classList.remove(\"active\");\r\n\t\t});\r\n\t\tconst tabs = document.getElementsByClassName(\"tab\");\r\n\t\tArray.from(tabs).forEach((el) => {\r\n\t\t\tel.classList.remove(\"active\");\r\n\t\t});\r\n\t\tlayout.toggleClass(`${tabName}-container`, \"active\");\r\n\t\tlayout.toggleClass(`${tabName}`, \"active\");\r\n\t},\r\n};\r\n\r\nconst data = {\r\n\tnewEvent: (data) => {\r\n\t\tconst events = storage.getItemLocal(\"events\");\r\n\t\tevents.push(data);\r\n\t\tstorage.setItemLocal(\"events\", events);\r\n\t},\r\n\tgetAllEvents: () => {\r\n\t\treturn storage.getItemLocal(\"events\");\r\n\t},\r\n\tfindEvent: (id) => {\r\n\t\tconst events = data.getAllEvents();\r\n\t\treturn events.find((ev) => ev.id === id);\r\n\t},\r\n\tfindNote: (id) => {\r\n\t\tconst notes = storage.getItemLocal(\"notes\");\r\n\t\treturn notes.find((note) => note.id === id);\r\n\t},\r\n\teditEvent: (event) => {\r\n\t\tlet events = data.getAllEvents();\r\n\t\tevents = events.map((ev) => {\r\n\t\t\tif (ev.id === event.id) {\r\n\t\t\t\tev.title = event.title;\r\n\t\t\t\tev.start = event.start;\r\n\t\t\t\tev.color = event.color;\r\n\t\t\t\tev.description = event.description;\r\n\t\t\t}\r\n\t\t\treturn ev;\r\n\t\t});\r\n\t\tstorage.setItemLocal(\"events\", events);\r\n\t},\r\n\tremoveEvent: (event) => {\r\n\t\tlet events = data.getAllEvents();\r\n\t\tevents = events.filter((ev) => {\r\n\t\t\treturn ev.id !== event.id;\r\n\t\t});\r\n\t\tstorage.setItemLocal(\"events\", events);\r\n\t},\r\n};\r\n\r\nconst events = {\r\n\tformatEvent: (formId) => {\r\n\t\tconst form = document.getElementById(formId);\r\n\t\tconst id = form.elements[\"id\"]\r\n\t\t\t? form.elements[\"id\"].value\r\n\t\t\t: storage.generateUuid();\r\n\r\n\t\tconst adversary = form.elements[\"adversary\"].value;\r\n\t\tconst competition = form.elements[\"competition\"].value;\r\n\t\tconst locale = form.elements[\"locale\"].value;\r\n\t\tconst club = config.getClub();\r\n\r\n\t\tconst GP = form.elements[\"GP\"].value;\r\n\t\tconst GS = form.elements[\"GS\"].value;\r\n\t\tlet color = \"blue\";\r\n\t\tif (GP && GS) {\r\n\t\t\tif (GP === GS) {\r\n\t\t\t\tcolor = \"yellow\";\r\n\t\t\t} else if (GP > GS) {\r\n\t\t\t\tcolor = \"green\";\r\n\t\t\t} else {\r\n\t\t\t\tcolor = \"red\";\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\tconst title =\r\n\t\t\tlocale === \"1\"\r\n\t\t\t\t? `${club} ${GP} - ${GS} ${adversary} (${competition})`\r\n\t\t\t\t: `${adversary} ${GS} - ${GP} ${club} (${competition})`;\r\n\r\n\t\tconst start = form.elements[\"start\"].value;\r\n\t\tconst description = form.elements[\"description\"].value;\r\n\t\tconst event = {\r\n\t\t\tid,\r\n\t\t\ttitle,\r\n\t\t\tstart,\r\n\t\t\tcolor,\r\n\t\t\tadversary,\r\n\t\t\tcompetition,\r\n\t\t\tlocale,\r\n\t\t\tGP,\r\n\t\t\tGS,\r\n\t\t\tdescription,\r\n\t\t\tdisplay: \"block\",\r\n\t\t\ttextColor: color !== \"blue\" || color !== \"blue\" ? \"#000\" : \"#FFF\",\r\n\t\t\tclassName: \"ev-item\",\r\n\t\t};\r\n\t\tconsole.log(event);\r\n\t\tform.reset();\r\n\t\treturn event;\r\n\t},\r\n\teditEvent: (id) => {\r\n\t\tconst event = data.findEvent(id);\r\n\t\tconst form = document.getElementById(\"editEvent\");\r\n\t\tform.elements[\"id\"].value = event.id;\r\n\t\tform.elements[\"adversary\"].value = event.adversary;\r\n\t\tform.elements[\"competition\"].value = event.competition;\r\n\t\tform.elements[\"GP\"].value = event.GP;\r\n\t\tform.elements[\"GS\"].value = event.GS;\r\n\t\tform.elements[\"start\"].value = event.start;\r\n\t\tform.elements[\"description\"].value = event.description;\r\n\t\tif (event.locale === \"2\") {\r\n\t\t\tdocument.querySelector(\"#editEvent #editHome\").checked = false;\r\n\t\t\tdocument.querySelector(\"#editEvent #editOut\").checked = true;\r\n\t\t} else {\r\n\t\t\tdocument.querySelector(\"#editEvent #editOut\").checked = false;\r\n\t\t\tdocument.querySelector(\"#editEvent #editHome\").checked = true;\r\n\t\t}\r\n\t\tlayout.toggleModal(\"modal-edit-event\");\r\n\t},\r\n};\r\nconst config = {\r\n\tgetData: () => {\r\n\t\treturn storage.getItemLocal(\"config\");\r\n\t},\r\n\tgetClub: () => {\r\n\t\tconst configs = storage.getItemLocal(\"config\");\r\n\t\treturn configs && configs.club ? configs.club : \"MyClub\";\r\n\t},\r\n\texportData: () => {\r\n\t\tconst allKeys = [\"events\", \"config\", \"onboarding\"];\r\n\t\tconst nonArrayKeys = [\"onboarding\"];\r\n\t\tlet data = {};\r\n\t\tallKeys.forEach((key) => {\r\n\t\t\tconst value = storage.getItemLocal(\r\n\t\t\t\tkey,\r\n\t\t\t\t!nonArrayKeys.includes(key)\r\n\t\t\t);\r\n\t\t\tdata = { ...data, [key]: value };\r\n\t\t});\r\n\t\treturn JSON.stringify(data);\r\n\t},\r\n\timportData: (data) => {\r\n\t\tfor (var key in data) {\r\n\t\t\tstorage.setItemLocal(key, data[key], typeof data[key] === \"object\");\r\n\t\t}\r\n\t},\r\n};\r\n\r\nmodule.exports = {\r\n\tstorage,\r\n\tlayout,\r\n\tdata,\r\n\tevents,\r\n\tconfig,\r\n};\r\n\n\n//# sourceURL=webpack://my-club/./src/utils.js?");

/***/ }),

/***/ "./src/welcome.js":
/*!************************!*\
  !*** ./src/welcome.js ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n\r\nutils.layout.addClickEvent(\"importData\", () => {\r\n\tconst dataText = window.prompt(\"Cole aqui o texto copiado anteriormente\");\r\n\tif (dataText) {\r\n\t\tconst data = JSON.parse(dataText);\r\n\t\tutils.storage.setItemLocal(\"onboarding\", true, false);\r\n\t\tutils.config.importData(data);\r\n\t\tlocation.href = \"index.html\";\r\n\t}\r\n});\r\n\r\nutils.layout.addClickEvent(\"saveConfigs\", () => {\r\n\tconst form = document.getElementById(\"onboarding\");\r\n\tconst club = form.elements[\"club\"].value;\r\n\tconst clubLong = form.elements[\"clubLong\"].value;\r\n\tconst configs = {\r\n\t\tclub,\r\n\t\tclubLong,\r\n\t};\r\n    utils.storage.setItemLocal(\"onboarding\", true, false);\r\n\tutils.storage.setItemLocal(\"config\", configs);\r\n\tlocation.href = \"index.html\";\r\n});\r\n\n\n//# sourceURL=webpack://my-club/./src/welcome.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/utils.js");
/******/ 	
/******/ })()
;