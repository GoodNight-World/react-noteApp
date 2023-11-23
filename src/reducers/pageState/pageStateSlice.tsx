import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface PageState {
    mode: 'Notes'|'Edit-notes'|'Archive'|'Trash';
    tag: string;
    tags: string[];
}

export const initialState: PageState = {
    mode: 'Notes',
    tag: 'all',
    tags: ['Coding'],
}

export const pageStateSlice = createSlice({
    name: 'pageState',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setTag: (state, action) => {
            state.tag = action.payload;
        },
        pushTag: (state, action) => {
            state.tags.push(action.payload);
        },
        deleteTag: (state, action) => {
            state.tags = state.tags.filter(tag => tag !== action.payload);
        }

    }
})

export const { setMode, setTag, pushTag, deleteTag } = pageStateSlice.actions;

export const currentMode = (state: RootState) => state.pageState.mode; // 모드
export const currentTag = (state: RootState) => state.pageState.tag; // 현재 태그
export const tags = (state: RootState) => state.pageState.tags; // 태그 목록

export default pageStateSlice.reducer;

