import { Note, Notebook, notebooks } from "../lib/";

Notebook.find("A new test Notebook") // Find a Notebook
  .then((book: Notebook) => {
    return book.delete(); // Delete a Notebook
  })
  .catch((error) => {
    console.log(error);
  })
  .then(() => {
    return Notebook.create("A new test Notebook"); // Create a Notebook
  })
  .then((book: Notebook) => {
    return book.notes(); // List notes in Notebook
  })
  .then((notes: Note[]) => {
    console.log(notes);
    const title = "Note " + new Date().toString();
    return Note.create(title, "A new test Notebook", "My first note"); // Create a note from text
  }).then((note: Note) => {
    console.log(note);
    return note.append("I add some text"); // Append text to a Note
  }).then(() => {
    const title = "HTML Note " + new Date().toString();
    return Note.create(title, "A new test Notebook", undefined, "<h1>Note Title</h1>"); // Create a note from HTML
  }).then((note: Note) => {
    console.log(note);
    return note.updateHtml("<h1>I changed the Title</h1>"); // Update note HTML
  });
