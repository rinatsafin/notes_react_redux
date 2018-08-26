import React from "react";
import PropTypes from "prop-types";
import { connect, } from "react-redux";
import Note from "../Note";
import styles from "./noteslist.css";

const ConnectedNotesList = ({ notes, }) => {
  return (
    <div className={styles.app}>
      {
        notes.length ?
          notes.map(note => (
            <Note
              id={note.id}
              key={note.id}
            >
              {note.text}
            </Note>
          )) : (<p className={styles.empty}>no notes yet :(</p>	)
      }
    </div>
  )
};

ConnectedNotesList.propTypes = {
  notes: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  const notes = JSON.parse(localStorage.getItem("notes"));
  const result = { notes: state.notes, };
  if (notes == null) localStorage.setItem("notes", JSON.stringify(state.notes));
  return result;
};

const NotesList = connect(mapStateToProps)(ConnectedNotesList);
export default NotesList;