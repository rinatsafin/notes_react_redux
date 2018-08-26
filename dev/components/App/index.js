import React from "react";

import NotesList from "../NotesList";
import Form from "../Form";

import "./global.css";
import styles from "./app.css";

const App = () => (
  <div className={styles.app}>
    <h1 className={styles.header}>
      Notes
    </h1>
    <Form />
    <NotesList />
  </div>
)

export default App;