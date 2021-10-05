const utils = require("./utils");
function init() {
	const initialDate = utils.storage.getItemLocal("lastUpdate", false);

	const calendarEl = document.getElementById("calendar");
	const events = utils.data.getAllEvents();
	const calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: "listYear",
		initialDate,
		events,
		headerToolbar: {
			right: "prev,next",
			left: "title",
		},
		views: {
			dayGridMonth: {
				titleFormat: {
					month: "long",
					year: "numeric",
				},
			},
			listYear: {
				titleFormat: {
					year: "numeric",
				},
			},
		},
		eventClick: function (info) {
			utils.events.editEvent(info.event.id);
		},
	});

	calendar.setOption("locale", "pt-BR");
	calendar.render();

	utils.layout.addClickEvent("openNewEventModal", () => {
		utils.events.setDate();
		utils.layout.toggleModal("modal-new-event");
	});
	utils.layout.addClickEvent("closeNewEventModal", () => {
		utils.layout.toggleModal("modal-new-event");
	});
	utils.layout.addClickEvent("saveNewEvent", () => {
		const event = utils.events.formatEvent("newEvent");
		utils.data.newEvent(event);
		calendar.addEvent(event);
		utils.layout.toggleModal("modal-new-event");
	});
	utils.layout.addClickEvent("listYear", () => {
		calendar.changeView("listYear");
	});
	utils.layout.addClickEvent("dayGridMonth", () => {
		calendar.changeView("dayGridMonth");
	});
	utils.layout.addClickEvent("closeEditEventModal", () => {
		utils.layout.toggleModal("modal-edit-event");
	});
	utils.layout.addClickEvent("deleteEvent", () => {
		const eventData = utils.events.formatEvent("editEvent");
		const event = calendar.getEventById(eventData.id);
		event.remove();
		utils.data.removeEvent(eventData);
		utils.layout.toggleModal("modal-edit-event");
	});
	utils.layout.addClickEvent("saveEvent", () => {
		const eventData = utils.events.formatEvent("editEvent");
		const event = calendar.getEventById(eventData.id);
		event.setProp("title", eventData.title);
		event.setStart(eventData.start, { maintainDuration: true });
		utils.data.editEvent(eventData);
		utils.layout.toggleModal("modal-edit-event");
	});
}

module.exports = init();
