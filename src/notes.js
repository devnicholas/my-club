const utils = require("./utils");

const notes = utils.storage.getItemLocal("notes");
const form = document.getElementById("noteForm");
notes.map((note) => {
	const notesList = document.getElementById("notes-list");
	const tempContent = notesList.innerHTML;
	const content =
		tempContent +
		`
    <div class="flex justify-between py-2 border-b border-gray-500">
        <p class="font-medium text-lg self-center">${note.title}</p>
        <div class="w-100 flex">
            <button class="btn btn-blue self-center mr-1 editNote" data-id="${note.id}">Editar</button>
            <button class="btn btn-red self-center removeNote" data-id="${note.id}">Excluir</button>
        </div>
    </div>`;
	notesList.innerHTML = content;
});

utils.layout.addClickEvent("openModal", () => {
    form.reset();
	utils.layout.toggleModal("modal-note");
});
utils.layout.addClickEvent("closeModal", () => {
	form.reset();
	utils.layout.toggleModal("modal-note");
});
utils.layout.addClickEvent("saveNote", () => {
	const id =
		form.elements["id"].value === ""
			? utils.storage.generateUuid()
			: form.elements["id"].value;
	const title = form.elements["title"].value;
	const note = form.elements["note"].value;
	const data = {
		id,
		title,
		note,
	};
    if(form.elements["id"].value === ""){
        notes.push(data);
        utils.storage.setItemLocal("notes", notes);
    }else{
        const newNotes = notes.map((note) => {
            return note.id === data.id ? data : note
        })
        utils.storage.setItemLocal("notes", newNotes);
    }
	form.reset();
	location.reload();
});

utils.layout.addClickEvents("editNote", (event) => {
	const id = event.target.getAttribute("data-id");
	const data = utils.data.findNote(id);
	form.elements["id"].value = data.id;
	form.elements["title"].value = data.title;
	form.elements["note"].value = data.note;
	utils.layout.toggleModal("modal-note");
});
utils.layout.addClickEvents("removeNote", (event) => {
	const id = event.target.getAttribute("data-id");
	const newNotes = notes.filter((note) => {
		return note.id !== id;
	});
	utils.storage.setItemLocal("notes", newNotes);
    location.reload()
});
