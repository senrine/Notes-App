import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addNoteFromUser, editNote } from "../features/notes";
import { useParams } from "react-router-dom";

export default function Edit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const notes = useSelector((state) => state.notes);

  const [inputsState, setInputsState] = useState({
    title: "",
    subtitle: "",
    bodyText: "",
  });

  const [showValidation, setShowValidation] = useState({
    title: false,
    subtitle: false,
    bodyText: false,
  });

  useEffect(() => {
    if (id && notes.list) {
      setInputsState({
        title: notes.list.find((note) => note.id === id).title,
        subtitle: notes.list.find((note) => note.id === id).subtitle,
        bodyText: notes.list.find((note) => note.id === id).bodyText,
      });
    } else {
      setInputsState({ title: "", subtitle: "", bodyText: "" });
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.values(inputsState).every((value) => value)) {
      setShowValidation({ title: false, subtitle: false, bodyText: false });

      if (id && notes.list) {
        dispatch(editNote({ ...inputsState, id }));
      } else {
        dispatch(addNoteFromUser({ ...inputsState, id: nanoid(8) }));
        setInputsState({
          title: "",
          subtitle: "",
          bodyText: "",
        });
      }
    } else {
      for (const [key, value] of Object.entries(inputsState)) {
        if (value.length === 0) {
          setShowValidation((state) => ({ ...state, [key]: true }));
        } else {
          setShowValidation((state) => ({ ...state, [key]: false }));
        }
      }
    }
  }

  return (
    <div className="w-full p-10 text-slate-100">
      <p className="text-xl mb-4">Ajouter une note</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="mb-2 block">
          Le titre
        </label>
        <input
          value={inputsState.title}
          onChange={(e) =>
            setInputsState({ ...inputsState, title: e.target.value })
          }
          type="text"
          id="title"
          className="p-2 text-md bg-slate-200 text-slate-800 block w-full rounded"
        />
        {showValidation.title && (
          <p className="text-red-500">Veuillez renseigner un titre</p>
        )}
        <label htmlFor="subtitle" className="mb-2 block mt-4">
          Le sous-titre
        </label>
        <input
          value={inputsState.subtitle}
          onChange={(e) =>
            setInputsState({ ...inputsState, subtitle: e.target.value })
          }
          type="text"
          id="subtitle"
          className="p-2 text-md bg-slate-200 text-slate-800 block w-full rounded"
        />
        {showValidation.subtitle && (
          <p className="text-red-500">Veuillez renseigner un sous-titre</p>
        )}
        <label htmlFor="bodyText" className="mb-2 block mt-4">
          Contenu de la note
        </label>
        <textarea
          spellCheck="false"
          value={inputsState.bodyText}
          onChange={(e) =>
            setInputsState({ ...inputsState, bodyText: e.target.value })
          }
          type="text"
          id="bodyText"
          className="min-h-[300px] p-2 text-md bg-slate-200 text-slate-800 block w-full rounded"
        ></textarea>
        {showValidation.bodyText && (
          <p className="text-red-500">Veuillez écrire du contenu</p>
        )}

        <button className="mt-4 bg-slate-100 hover:bg-slate-300 px-2 py-1 text-slate-800 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
