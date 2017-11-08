"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var osa = require("osa2");
var Note = (function () {
    function Note(object) {
        if (object) {
            this.id = object.id;
            this.title = object.title;
            this.creationDate = object.creationDate;
            this.modificationDate = object.modificationDate;
            this.subjectDate = object.subjectDate;
            this.sourceURL = object.sourceURL;
            this.latitude = object.latitude;
            this.longitude = object.longitude;
            this.altitude = object.altitude;
            this.enmlContent = object.enmlContent;
            this.htmlContent = object.htmlContent;
            this.noteLink = object.noteLink;
            this.reminderTime = object.reminderTime;
            this.reminderDoneTime = object.reminderDoneTime;
            this.reminderOrder = object.reminderOrder;
            this.notebook = object.notebook;
        }
    }
    Note.create = function (title, notebook, text, html, enml) {
        if (text) {
            return osa(function (title, notebook, text) {
                var Evernote = Application("Evernote");
                var note = Evernote.createNote({
                    withText: text,
                    title: title,
                    notebook: notebook,
                });
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
            })(title, notebook, text).then(function (note) { return new Note(note); });
        }
        if (html) {
            return osa(function (title, notebook, html) {
                var Evernote = Application("Evernote");
                var note = Evernote.createNote({
                    withHtml: html,
                    title: title,
                    notebook: notebook,
                });
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
            })(title, notebook, html).then(function (note) { return new Note(note); });
        }
        if (enml) {
            return osa(function (title, notebook, enml) {
                var Evernote = Application("Evernote");
                var note = Evernote.createNote({
                    withEnml: enml,
                    title: title,
                    notebook: notebook,
                });
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
            })(title, notebook, enml).then(function (note) { return new Note(note); });
        }
        throw new Error("You must specify 'text', 'html', or 'enml' to create a note");
    };
    Note.prototype.updateHtml = function (html) {
        return osa(function (note, html) {
            var Evernote = Application("Evernote");
            var match;
            if (note.noteLink) {
                match = Evernote.findNote(note.noteLink);
            }
            else {
                match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
            }
            html = html.toString().replace(/\r?\n|\r/g, "").replace(/\"/g, "&quot;");
            match.htmlContent = html;
        })(this, html);
    };
    Note.prototype.updateEnml = function (enml) {
        return osa(function (note, enml) {
            var Evernote = Application("Evernote");
            var match;
            if (note.noteLink) {
                match = Evernote.findNote(note.noteLink);
            }
            else {
                match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
            }
            match.enmlContent = enml;
        })(this, enml);
    };
    Note.prototype.append = function (text, html) {
        if (text) {
            return osa(function (note, text) {
                var Evernote = Application("Evernote");
                var match;
                if (note.noteLink) {
                    match = Evernote.findNote(note.noteLink);
                }
                else {
                    match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
                }
                match.append({ text: text });
            })(this, text);
        }
        if (html) {
            return osa(function (note, html) {
                var Evernote = Application("Evernote");
                var match;
                if (note.noteLink) {
                    match = Evernote.findNote(note.noteLink);
                }
                else {
                    match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
                }
                match.append({ html: html });
            })(this, html);
        }
        throw new Error("You must specify 'text', or 'html'");
    };
    Note.prototype.open = function () {
        return osa(function (note) {
            var Evernote = Application("Evernote");
            var match;
            if (note.noteLink) {
                match = Evernote.findNote(note.noteLink);
            }
            else {
                match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
            }
            match.openNoteWindow();
        })(this);
    };
    Note.prototype.delete = function () {
        return osa(function (note) {
            var Evernote = Application("Evernote");
            var match;
            if (note.noteLink) {
                match = Evernote.findNote(note.noteLink);
            }
            else {
                match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
            }
            match.delete();
        })(this);
    };
    return Note;
}());
exports.Note = Note;
