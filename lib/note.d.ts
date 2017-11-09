export declare class Note {
    static create(title: string, notebook: string, text?: string, html?: string, enml?: string): Promise<Note>;
    static findByTitle(title: string, notebook: string): Promise<Note>;
    id: string;
    title: string;
    creationDate: Date;
    modificationDate: Date;
    subjectDate: Date;
    sourceURL: string;
    latitude: number;
    longitude: number;
    altitude: number;
    enmlContent: string;
    htmlContent: string;
    noteLink: string;
    reminderTime: Date;
    reminderDoneTime: Date;
    reminderOrder: Date;
    notebook: string;
    constructor(object?: any);
    updateHtml(html: string): Promise<any>;
    updateEnml(enml: string): Promise<any>;
    append(text?: string, html?: string): Promise<any>;
    open(): Promise<any>;
    delete(): Promise<any>;
}
