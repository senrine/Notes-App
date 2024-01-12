import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotesFromApi } from "../features/notes";
import { Link } from "react-router-dom";

export default function NoteList() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  if (!notes.list) {
    dispatch(getNotesFromApi());
  }

  return (
    <div className="p-10 w-full">
      <p className="text-xl text-slate-100 mb-6">Bienvenue sur Notes101</p>
      <ul className="grid lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-6">
        {notes.list &&
          notes.list.map((note) => (
            <li
              key={note.id}
              className="bg-slate-100 rounded cursor-pointer hover:bg-slate-50"
            >
              <Link className="block p-4 w-full h-full" to={`/note/${note.id}`}>
                <p className="text-lg font-semibold text-slate-900">
                  {note.title}
                </p>
                <p className="text-gray-700">{note.subtitle}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
