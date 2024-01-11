import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotesFromApi } from "../features/notes";

export default function NoteList() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  if (!notes.list) {
    dispatch(getNotesFromApi());
  }

  console.log(notes);

  return <div>NoteList</div>;
}
