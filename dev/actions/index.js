//import { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE, } from "../constants/actions_types";
// Хотел  использовать константы, но при вызове action'ов вылетала ошибка.

export const addNote = note => {
  const notes = JSON.parse(localStorage.getItem("notes"));
  localStorage.setItem("notes", JSON.stringify([ note, ...notes, ]));
  return { type: "ADD_NOTE", payload: note, };
};

export const editNote = note => {
  const notes = JSON.parse(localStorage.getItem("notes"));
  if (notes) {
    const newNotes = notes.map(noteItem => {
      if (noteItem.id == note.id) noteItem.text = note.text;
      return noteItem;
    });
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }
  return { type: "EDIT_NOTE", note, };
};

export const removeNote = id => {
  const notes = JSON.parse(localStorage.getItem("notes"));
  if (notes) localStorage.setItem("notes", JSON.stringify(notes.filter(note => note.id !== id )));
  return { type: "REMOVE_NOTE", id, };
};