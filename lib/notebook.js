"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var osa = require("osa2");
var note_1 = require("./note");
function notebooks() {
    return osa(function () {
        var Evernote = Application("Evernote");
        return Evernote.notebooks().map(function (notebook) {
            return {
                default: notebook.default(),
                name: notebook.name(),
            };
        });
    })().then(function (notebooks) {
        return notebooks.map(function (notebook) { return new Notebook(notebook); });
    });
}
exports.notebooks = notebooks;
var Notebook = (function () {
    function Notebook(object) {
        this.name = object.name;
        this.default = object.default || false;
    }
    Notebook.find = function (name) {
        return osa(function (name) {
            var Evernote = Application("Evernote");
            var notebook = Evernote.notebooks.byName(name.replace(/'/g, "\\\'"));
            if (!notebook.exists()) {
                throw new Error("Notebook " + name + " not found");
            }
            return {
                default: notebook.default(),
                name: notebook.name(),
            };
        })(name).then(function (notebook) { return new Notebook(notebook); });
    };
    Notebook.create = function (name) {
        return osa(function (name) {
            var Evernote = Application("Evernote");
            var notebook = Evernote.notebooks.byName(name.replace(/'/g, "\\\'"));
            if (notebook.exists()) {
                throw new Error("Notebook " + name + " already exists");
            }
            var newNb = Evernote.createNotebook(name.replace(/'/g, "\\\'"));
            return {
                default: newNb.default(),
                name: newNb.name(),
            };
        })(name).then(function (notebook) { return new Notebook(notebook); });
    };
    Notebook.prototype.notes = function () {
        return osa(function (notebookName) {
            var Evernote = Application("Evernote");
            var notebook = Evernote.notebooks.byName(notebookName.replace(/'/g, "\\\'"));
            return notebook.notes().map(function (note) {
                return {
                    id: note.id(),
                    title: note.title(),
                    creationDate: note.creationDate(),
                    modificationDate: note.modificationDate(),
                    subjectDate: note.subjectDate(),
                    sourceURL: note.sourceURL(),
                    latitude: note.latitude(),
                    longitude: note.longitude(),
                    altitude: note.altitude(),
                    enmlContent: note.enmlContent(),
                    htmlContent: note.htmlContent(),
                    noteLink: note.noteLink(),
                    reminderTime: note.reminderTime(),
                    reminderDoneTime: note.reminderDoneTime(),
                    reminderOrder: note.reminderOrder(),
                    notebook: note.notebook.name(),
                };
            });
        })(this.name).then(function (notes) {
            return notes.map(function (note) { return new note_1.Note(note); });
        });
    };
    Notebook.prototype.delete = function () {
        return osa(function (name) {
            var Evernote = Application("Evernote");
            var notebook = Evernote.notebooks.byName(name.replace(/'/g, "\\\'"));
            if (!notebook.exists()) {
                throw new Error("Notebook " + name + " note found");
            }
            notebook.delete();
        })(this.name);
    };
    return Notebook;
}());
exports.Notebook = Notebook;
