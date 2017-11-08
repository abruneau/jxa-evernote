import * as osa from "osa2";

import { Note } from "./note";

declare const Application: any;

export function notebooks(): Promise<Notebook[]> {
  return osa(() => {
    const Evernote = Application("Evernote");
    return Evernote.notebooks().map((notebook) => {
      return {
        default: notebook.default(),
        name: notebook.name(),
      };
    });
  })().then((notebooks) => {
    return notebooks.map((notebook) => new Notebook(notebook));
  });
}

export class Notebook {

  public static find(name: string): Promise<Notebook> {
    return osa((name) => {
      const Evernote = Application("Evernote");
      const notebook = Evernote.notebooks.byName(name.replace(/'/g, "\\\'"));
      if (!notebook.exists()) {
        throw new Error(`Notebook ${name} note found`);
      }
      return {
        default: notebook.default(),
        name: notebook.name(),
      };
    })(name).then((notebook) => new Notebook(notebook));
  }

  public static create(name: string): Promise<Notebook> {
    return osa((name) => {
      const Evernote = Application("Evernote");
      const notebook = Evernote.notebooks.byName(name.replace(/'/g, "\\\'"));
      if (notebook.exists()) {
        throw new Error(`Notebook ${name} already exists`);
      }
      const newNb = Evernote.createNotebook(name.replace(/'/g, "\\\'"));
      return {
        default: newNb.default(),
        name: newNb.name(),
      };
    })(name).then((notebook) => new Notebook(notebook));
  }

  public name: string;
  public default: boolean;

  constructor(object?: any) {
    this.name = object.name;
    this.default = object.default || false;
  }

  public notes(): Promise<Note[]> {
    return osa((notebookName) => {
      const Evernote = Application("Evernote");
      const notebook = Evernote.notebooks.byName(notebookName.replace(/'/g, "\\\'"));
      return notebook.notes().map((note) => {
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
    })(this.name).then((notes) => {
      return notes.map((note) => new Note(note));
    });
  }

  public delete(): Promise<any> {
    return osa((name) => {
      const Evernote = Application("Evernote");
      const notebook = Evernote.notebooks.byName(name.replace(/'/g, "\\\'"));
      if (!notebook.exists()) {
        throw new Error(`Notebook ${name} note found`);
      }
      notebook.delete();
    })(this.name);
  }
}
