import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Note = {
    id: string;
    title: string;
    contents: string;
    tags: string[];
    priority: string;
    background: string;
    created_at: string;
    updated_at: string;
    pin: boolean;
}

export type NoteGroup = {
    notes: Note[];
}

const initialState: NoteGroup = {
    notes: []
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote: {
            reducer: (state, {payload}: PayloadAction<Note>) => {
                state.notes.push(payload);
            },
            prepare: ({title, contents, tags, priority, background}: any) => {
                const noteTemp: Note = {
                    id: crypto.randomUUID(),
                    title: title,
                    contents: contents,
                    tags: tags,
                    priority: priority,
                    background: background,
                    created_at: new Date().toLocaleString(),
                    updated_at: "",
                    pin: false,
                }
                return {
                    payload: noteTemp,
                }
            }
        },
        deleteNote: (state, action) => {
            state.notes.splice(state.notes.indexOf(action.payload), 1);
        },
        togglePin: (state, action) => {
            state.notes.map(note => {
                if(note.id === action.payload) note.pin = !note.pin;
                return note;
            })
        },
        save: (state) => {
            localStorage.setItem('notes', JSON.stringify(state))
        },
        load: (state) => {
            const result = localStorage.getItem('notes')
            console.log(result)
        },
    }
})

export const { createNote, deleteNote, togglePin, save, load } = noteSlice.actions;

export const getNotes = (state: RootState) => state.notes.notes;
export default noteSlice.reducer;