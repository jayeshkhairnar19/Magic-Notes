// console.log("Welcome to Notes App");
showNotes();

let addNotebtn = document.getElementById('addNotebtn');
addNotebtn.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Notes have been added");
    let addTxt = document.getElementById('addTxt');

    let notes = localStorage.getItem('notes');
    let notesObj = [];

    if (notes !== null) {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";

    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";

    for (let i = 0; i < notesObj.length; i++) {
        let index = i;
        html = html +
            `<div class="card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${i + 1} </h5>
                    <p class="card-text">${notesObj[i]}</p>
                    <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    }

    let generatedNotes = document.getElementById('generatedNotes');
    if (notesObj.length != 0) {
        generatedNotes.innerHTML = html;
    } else {
        generatedNotes.innerHTML = `Nothing to show! Please add notes!`
    }
}

function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

function Search() {
    let searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function () {
        let searchTerm = searchInput.value.toLowerCase();
        console.log("input event has been fired");

        let notes = localStorage.getItem("notes");
        let notesObj = [];

        if (notes !== null) {
            notesObj = JSON.parse(notes);
        }

        let generatedNotes = document.getElementById('generatedNotes');
        let html = "";

        for (let i = 0; i < notesObj.length; i++) {
            let note = notesObj[i].toLowerCase();

            if (note.includes(searchTerm)) {
                html += `<div class="card mx-2 my-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${i + 1} </h5>
                        <p class="card-text">${notesObj[i]}</p>
                        <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
            }
        }

        if (html !== "") {
            generatedNotes.innerHTML = html;
        } else {
            generatedNotes.innerHTML = `No matching notes found.`;
        }
    });
}

// Call the Search function to attach the event listener
Search();
