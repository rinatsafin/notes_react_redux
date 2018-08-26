import { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE, } from "../constants/actions_types";

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || 
  [
    {
      id: 1,
      text: "text1",
    },
    {
      id: 2,
      text: "text2",
    },
    {
      id: 3,
      text: "text3",
    },
    { 
      id: 4, 
      text: "text4", 
    },
    { 
      id: 5, 
      text: "text5", 
    },
  ],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case ADD_NOTE:
    return { ...state, notes: [...state.notes, action.payload, ], };
  case EDIT_NOTE:
    return {...state, notes: state.notes.map(note => {
      if (note.id == action.note.id) note.text = action.note.text;
      return note;
    }), };
  case REMOVE_NOTE:
    return { ...state, notes: state.notes.filter(note => note.id !== action.id ), };
  default:
    return state;
  }
};

export default reducers;