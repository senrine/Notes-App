import { createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import { list } from "postcss";
import { useEffect } from "react";

const initialState = {
  list: undefined,
};

const notes = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotesFromApi: (state, action) => {
      state.list = action.payload;
    },
    deleteNote: (state, action) =>{
      const indexOfNoteToDelete = state.list.findIndex(note => note.id === action.payload)
      state.list.splice(indexOfNoteToDelete,1)    
    },
    addNoteFromUser: (state,action) =>{
      state.list.push(action.payload)
    },
    editNote: (state,action) => {
      const indexOfEditedNote = state.list.findIndex(note => note.id === action.payload.id)
      state.list[indexOfEditedNote] = action.payload
    }
  },
});

export function getNotesFromApi(action) {
  return function (dispatch, getState) {
    fetch("/data/notes.json")
      .then(response => response.json())
      .then(data => dispatch(addNotesFromApi(data.notes)));
  };
}

export const { addNotesFromApi, deleteNote, addNoteFromUser, editNote } = notes.actions;
export default notes.reducer;
