import { Note } from "./note";
export declare function notebooks(): Promise<Notebook[]>;
export declare class Notebook {
    static find(name: string): Promise<Notebook>;
    static create(name: string): Promise<Notebook>;
    name: string;
    default: boolean;
    constructor(object?: any);
    notes(): Promise<Note[]>;
    delete(): Promise<any>;
}
