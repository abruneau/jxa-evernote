"use strict";
var _1 = require("../lib/");
_1.Notebook.find("A new test Notebook")
    .then(function (book) {
    return book.delete();
})
    .catch(function (error) {
    console.log(error);
})
    .then(function () {
    return _1.Notebook.create("A new test Notebook");
})
    .then(function (book) {
    return book.notes();
})
    .then(function (notes) {
    console.log(notes);
    var title = "Note " + new Date().toString();
    return _1.Note.create(title, "A new test Notebook", "My first note");
}).then(function (note) {
    console.log(note);
    return note.append("I add some text");
}).then(function () {
    var title = "HTML Note " + new Date().toString();
    return _1.Note.create(title, "A new test Notebook", undefined, "<h1>Note Title</h1>");
}).then(function (note) {
    console.log(note);
    return note.updateHtml("<h1>I changed the Title</h1>");
});
