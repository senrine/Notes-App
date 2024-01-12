import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SideNotes() {
  const notes = useSelector((state) => state.notes);
  return (
    <aside className="bg-slate-200 w-[275px] text-slate-900 shrink-0 flex flex-col items-center pt-2 border-r border-gray-300">
      <p className="w-full text-center text-2xl py-6 px-4 font-semibold border-b border-gray-300">
        Mes notes
      </p>
      <ul className="w-full divide-y divide-gray-300">
        {notes.list &&
          notes.list.map((note) => (
            <li
              key={note.id}
              className="bg-slate-200 relative cursor-pointer hover:bg-gray-300"
            >
              <Link
              to={`/note/${note.id}`}
              className="p-4 w-full h-full block">
                <span className="block text-xl text-slate-900">
                  {note.title}
                </span>
                <span className="block text-lg text-slate-800">
                  {note.subtitle}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}
