import BookmarkNotesIdb from "../../data/bookmark-notes-idb";
import NotesApi from "../../networks/notes-api";
import {
  createBookmarkButtonTemplate,
  createNoteListEmptyTemplate,
  createRemoveBookmarkButtonTemplate,
  noteItemTemplate,
} from "../templates/template-creator";

const Dashboard = {
  async render() {
    return `
      <div class="content">
        <h1>Dasbor</h1>

        <div id="notesList" class="mt-2 row justify-content-center gy-4"></div>
      </div>
    `;
  },

  async afterRender() {
    console.log("dashboard page");

    this._initialData();
  },

  async _initialData() {
    //* Get all bookmarked notes data from IndexedDB
    const allBookmarkedNotes = await BookmarkNotesIdb.getAllBookmarkedNotes();

    // Get all notes data from API
    const notes = await NotesApi.getAll();

    // Get notesList element
    const notesListEl = document.getElementById("notesList");

    // Check if notes data is empty
    if (!notes.data.length) {
      return this._populateNotesListEmpty(notesListEl);
    }

    this._populateNotesList(notesListEl, notes, allBookmarkedNotes);
  },

  _populateNotesList(containerEl, notes, allBookmarkedNotes) {
    containerEl.innerHTML = "";

    // Populate notes list with note item template
    notes.data.forEach((note) => {
      //* Check if note is bookmarked
      const isBookmarked = allBookmarkedNotes.find(
        (bookmarkedNotes) => bookmarkedNotes.id === note.id
      );

      const bookmarkButton = isBookmarked
        ? createRemoveBookmarkButtonTemplate(note.id)
        : createBookmarkButtonTemplate(note.id);

      containerEl.innerHTML += `
        <div class="col-12">
          ${noteItemTemplate(note, bookmarkButton)}
        </div>
      `;
    });

    // Add event listener to delete button for each note item
    containerEl.querySelectorAll(`#deleteNoteButton`).forEach((el) => {
      el.addEventListener("click", async (event) => {
        const noteId = event.target.dataset.id;

        try {
          const response = await NotesApi.destroy(noteId);

          window.alert(response.message);
          this._initialData();
        } catch (error) {
          console.log(error);
        }
      });
    });

    //* Add event listener to delete button for each note item
    containerEl.querySelectorAll(`#bookmarkButton`).forEach((el) => {
      el.addEventListener("click", async (event) => {
        const noteId = event.target.dataset.id;

        try {
          const note = await NotesApi.getById(noteId);
          await BookmarkNotesIdb.putBookmark(note.data);

          this._initialData();
        } catch (error) {
          console.error("Something wrong when bookmarking a note");
          console.error(error);
        }
      });
    });

    //* Add event listener to delete button for each note item
    containerEl.querySelectorAll(`#removeBookmarkButton`).forEach((el) => {
      el.addEventListener("click", async (event) => {
        const noteId = event.target.dataset.id;

        try {
          await BookmarkNotesIdb.deleteBookmark(noteId);

          this._initialData();
        } catch (error) {
          console.error(
            "Something wrong when deleting bookmark note from IndexedDB"
          );
          console.error(error);
        }
      });
    });
  },

  _populateNotesListEmpty(containerEl) {
    containerEl.innerHTML = createNoteListEmptyTemplate();
  },
};

export default Dashboard;
