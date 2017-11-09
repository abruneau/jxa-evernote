import * as osa from "osa2";

declare const Application: any;

export class Note {

  public static create(title: string, notebook: string, text?: string, html?: string, enml?: string): Promise<Note> {
    if (text) {
      return osa((title, notebook, text) => {
        const Evernote = Application("Evernote");
        const note = Evernote.createNote({
          withText: text,
          title,
          notebook,
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
      })(title, notebook, text).then((note) => new Note(note));
    }
    if (html) {
      return osa((title, notebook, html) => {
        const Evernote = Application("Evernote");
        const note = Evernote.createNote({
          withHtml: html,
          title,
          notebook,
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
      })(title, notebook, html).then((note) => new Note(note));
    }
    if (enml) {
      return osa((title, notebook, enml) => {
        const Evernote = Application("Evernote");
        const note = Evernote.createNote({
          withEnml: enml,
          title,
          notebook,
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
      })(title, notebook, enml).then((note) => new Note(note));
    }

    throw new Error("You must specify 'text', 'html', or 'enml' to create a note");
  }

  public static findByTitle(title: string, notebook: string): Promise<Note> {
    return osa((title, notebook) => {
      const Evernote = Application("Evernote");
      const query = 'intitle:"' + title + '" notebook:"' + notebook + '"';
      const matches = Evernote.findNotes(query.replace(/'/g, "\\\'"));
      if (matches.length) {
        return {
          id: matches[0].id(),
          title: matches[0].title(),
          creationDate: matches[0].creationDate(),
          modificationDate: matches[0].modificationDate(),
          subjectDate: matches[0].subjectDate(),
          sourceURL: matches[0].sourceURL(),
          latitude: matches[0].latitude(),
          longitude: matches[0].longitude(),
          altitude: matches[0].altitude(),
          enmlContent: matches[0].enmlContent(),
          htmlContent: matches[0].htmlContent(),
          noteLink: matches[0].noteLink(),
          reminderTime: matches[0].reminderTime(),
          reminderDoneTime: matches[0].reminderDoneTime(),
          reminderOrder: matches[0].reminderOrder(),
          notebook: matches[0].notebook.name(),
        };
      } else {
        return null;
      }
    })(title, notebook).then((note) => new Note(note));
  }

  public id: string;
  public title: string;
  public creationDate: Date;
  public modificationDate: Date;
  public subjectDate: Date;
  public sourceURL: string;
  public latitude: number;
  public longitude: number;
  public altitude: number;
  public enmlContent: string;
  public htmlContent: string;
  public noteLink: string;
  public reminderTime: Date;
  public reminderDoneTime: Date;
  public reminderOrder: Date;
  public notebook: string;
  // public tags: Tag[];

  constructor(object?: any) {
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

  public updateHtml(html: string): Promise<any> {
    return osa((note, html) => {
      const Evernote = Application("Evernote");
      let match;
      if (note.noteLink) {
        match = Evernote.findNote(note.noteLink);
      } else {
        match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
      }
      html = html.toString().replace(/\r?\n|\r/g, "").replace(/\"/g, "&quot;");
      match.htmlContent = html;
    })(this, html);
  }

  public updateEnml(enml: string): Promise<any> {
    return osa((note, enml) => {
      const Evernote = Application("Evernote");
      let match;
      if (note.noteLink) {
        match = Evernote.findNote(note.noteLink);
      } else {
        match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
      }
      match.enmlContent = enml;
    })(this, enml);
  }

  public append(text?: string, html?: string): Promise<any> {
    if (text) {
      return osa((note, text) => {
        const Evernote = Application("Evernote");
        let match;
        if (note.noteLink) {
          match = Evernote.findNote(note.noteLink);
        } else {
          match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
        }
        match.append({ text });
      })(this, text);
    }
    if (html) {
      return osa((note, html) => {
        const Evernote = Application("Evernote");
        let match;
        if (note.noteLink) {
          match = Evernote.findNote(note.noteLink);
        } else {
          match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
        }
        match.append({ html });
      })(this, html);
    }

    throw new Error("You must specify 'text', or 'html'");

  }

  public open(): Promise<any> {
    return osa((note) => {
      const Evernote = Application("Evernote");
      let match;
      if (note.noteLink) {
        match = Evernote.findNote(note.noteLink);
      } else {
        match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
      }
      match.openNoteWindow();
    })(this);
  }

  public delete(): Promise<any> {
    return osa((note) => {
      const Evernote = Application("Evernote");
      let match;
      if (note.noteLink) {
        match = Evernote.findNote(note.noteLink);
      } else {
        match = Evernote.notebooks.byName(note.notebook.replace(/'/g, "\\\'")).notes.byId(note.id);
      }
      match.delete();
    })(this);
  }
}
