const storage = {
	setItemLocal: (key, value, isObject = true) => {
		return localStorage.setItem(
			`my-club__${key}`,
			isObject ? JSON.stringify(value) : value
		);
	},
	getItemLocal: (key, isObject = true) => {
		const value = localStorage.getItem(`my-club__${key}`);
		if (!value) return isObject ? [] : null;
		return isObject ? JSON.parse(value) : value;
	},
	generateUuid: () => {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				var r = (Math.random() * 16) | 0,
					v = c == "x" ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			}
		);
	},
	removeAll: () => {
		localStorage.clear();
	},
};

const layout = {
	toggleClass: (id, className) => {
		const el = document.getElementById(id);
		el.classList.toggle(className);
	},
	removeClass: (id, className) => {
		const el = document.getElementById(id);
		el.classList.remove(className);
	},
	addClickEvent: (id, callback) => {
		const el = document.getElementById(id);
		el.addEventListener("click", callback);
	},
	addClickEvents: (id, callback) => {
		const elements = document.getElementsByClassName(id);
		for (var i = 0, max = elements.length; i < max; i++) {
			elements[i].addEventListener("click", callback);
		}
	},
	toggleModal: (id) => {
		layout.toggleClass(id, "hidden");
		layout.toggleClass(id, "fixed");
	},
	toggleTab: (tabName) => {
		const containers = document.getElementsByClassName("tab-container");
		Array.from(containers).forEach((el) => {
			el.classList.remove("active");
		});
		const tabs = document.getElementsByClassName("tab");
		Array.from(tabs).forEach((el) => {
			el.classList.remove("active");
		});
		layout.toggleClass(`${tabName}-container`, "active");
		layout.toggleClass(`${tabName}`, "active");
	},
};

const data = {
	newEvent: (data) => {
		const events = storage.getItemLocal("events");
		events.push(data);
		storage.setItemLocal("lastDate", data.start, false);
		storage.setItemLocal("events", events);
	},
	getAllEvents: () => {
		return storage.getItemLocal("events");
	},
	findEvent: (id) => {
		const events = data.getAllEvents();
		return events.find((ev) => ev.id === id);
	},
	findNote: (id) => {
		const notes = storage.getItemLocal("notes");
		return notes.find((note) => note.id === id);
	},
	editEvent: (event) => {
		let events = data.getAllEvents();
		events = events.map((ev) => {
			if (ev.id === event.id) {
				ev.title = event.title;
				ev.start = event.start;
				ev.color = event.color;
				ev.description = event.description;
				ev.GP = event.GP;
				ev.GS = event.GS;
				ev.adversary = event.adversary;
				ev.competition = event.competition;
			}
			return ev;
		});
		storage.setItemLocal("lastUpdate", event.start, false);
		storage.setItemLocal("events", events);
	},
	removeEvent: (event) => {
		let events = data.getAllEvents();
		events = events.filter((ev) => {
			return ev.id !== event.id;
		});
		storage.setItemLocal("events", events);
	},
};

const events = {
	formatEvent: (formId) => {
		const form = document.getElementById(formId);
		const id = form.elements["id"]
			? form.elements["id"].value
			: storage.generateUuid();

		const adversary = form.elements["adversary"].value;
		const competition = form.elements["competition"].value;
		const locale = form.elements["locale"].value;
		const club = config.getClub();

		const GP = form.elements["GP"].value;
		const GS = form.elements["GS"].value;
		let color = "blue";
		if (GP && GS) {
			if (GP === GS) {
				color = "yellow";
			} else if (GP > GS) {
				color = "green";
			} else {
				color = "red";
			}
		}

		const title =
			locale === "1"
				? `${club} ${GP} - ${GS} ${adversary} (${competition})`
				: `${adversary} ${GS} - ${GP} ${club} (${competition})`;

		const start = form.elements["start"].value;
		const description = form.elements["description"].value;
		const event = {
			id,
			title,
			start,
			color,
			adversary,
			competition,
			locale,
			GP,
			GS,
			description,
			display: "block",
			textColor: color !== "blue" || color !== "blue" ? "#000" : "#FFF",
			className: "ev-item",
		};
		form.reset();
		return event;
	},
	editEvent: (id) => {
		const event = data.findEvent(id);
		const form = document.getElementById("editEvent");
		form.elements["id"].value = event.id;
		form.elements["adversary"].value = event.adversary;
		form.elements["competition"].value = event.competition;
		form.elements["GP"].value = event.GP;
		form.elements["GS"].value = event.GS;
		form.elements["start"].value = event.start;
		form.elements["description"].value = event.description;
		if (event.locale === "2") {
			document.querySelector("#editEvent #editHome").checked = false;
			document.querySelector("#editEvent #editOut").checked = true;
		} else {
			document.querySelector("#editEvent #editOut").checked = false;
			document.querySelector("#editEvent #editHome").checked = true;
		}
		layout.toggleModal("modal-edit-event");
	},
	setDate: () => {
		if (storage.getItemLocal("lastDate", false)) {
			const dateControl = document.querySelector(
				'#modal-new-event input[type="date"]'
			);
			dateControl.value = storage.getItemLocal("lastDate", false);
		}
	},
};
const config = {
	getData: () => {
		return storage.getItemLocal("config");
	},
	getClub: () => {
		const configs = storage.getItemLocal("config");
		return configs && configs.club ? configs.club : "MyClub";
	},
	exportData: () => {
		const allKeys = ["events", "config", "onboarding", "lastDate", "lastUpdate"];
		const nonArrayKeys = ["onboarding", "lastDate", "lastUpdate"];
		let data = {};
		allKeys.forEach((key) => {
			const value = storage.getItemLocal(
				key,
				!nonArrayKeys.includes(key)
			);
			data = { ...data, [key]: value };
		});
		return JSON.stringify(data);
	},
	importData: (data) => {
		for (var key in data) {
			storage.setItemLocal(key, data[key], typeof data[key] === "object");
		}
	},
	copyText: (text) => {
		navigator.clipboard.writeText(text);
	},
};

module.exports = {
	storage,
	layout,
	data,
	events,
	config,
};
