export const removeNote = noteId => ({ type: "REMOVE", noteId, });
export const addNote = note => ({ type: "ADD", note, });
export const editNote = note => ({ type: "EDIT", note, });