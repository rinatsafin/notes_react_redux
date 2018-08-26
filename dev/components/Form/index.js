import React, { Component, } from "react";
import PropTypes from "prop-types";
import { connect, } from "react-redux";

import { addNote, } from "../../actions";

import styles from "./form.css";

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
    });
  }
  
  clearText() {
    this.setState({
      text: "",
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { text, } = this.state;
    const note = {
      id: Date.now(),
      text: text,
    }
    const { addNote, } = this.props;
    addNote(note);

    this.clearText();
  }

  render() {
    const { text, } = this.state;
    return (
      <form className={styles.app} onSubmit={this.handleSubmit}>
        <textarea
          placeholder="write your note"
          name="text"
          className={styles.textarea}
          value={text}
          onChange={this.handleChange}
          rows="5"
        />
        <button className={styles.button} type="submit">Save note</button>
      </form>
    );
  }
}

ConnectedForm.propTypes = {
  addNote: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    addNote: note => dispatch(addNote(note)),
  };
};

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;