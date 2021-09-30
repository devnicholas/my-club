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
        layout.toggleClass(`${tabName}-container`, 'active')
        layout.toggleClass(`${tabName}`, 'active')
	},
};

const data = {
	newEvent: (data) => {
		const events = storage.getItemLocal("events");
		events.push(data);
		storage.setItemLocal("events", events);
	},
	getAllEvents: () => {
		return storage.getItemLocal("events");
	},
	findEvent: (id) => {
		const events = data.getAllEvents();
		return events.find((ev) => ev.id === id);
	},
	editEvent: (event) => {
		let events = data.getAllEvents();
		events = events.map((ev) => {
			if (ev.id === event.id) {
				ev.title = event.title;
				ev.start = event.start;
				ev.color = event.color;
				ev.description = event.description;
			}
			return ev;
		});
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
		const title = form.elements["title"].value;
		const start = form.elements["start"].value;
		const color = form.elements["color"].value;
		const description = form.elements["description"].value;
		const event = {
			id,
			title,
			start,
			color,
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
		form.elements["title"].value = event.title;
		form.elements["start"].value = event.start;
		form.elements["color"].value = event.color;
		form.elements["description"].value = event.description;
		layout.toggleModal("modal-edit-event");
	},
};
const config = {
	getData: () => {
		return storage.getItemLocal("config");
	},
};

module.exports = {
	storage,
	layout,
	data,
	events,
	config,
};
