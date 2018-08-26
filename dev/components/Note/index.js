import React, { Component, } from "react";
import PropTypes from "prop-types";
import { connect, } from "react-redux";

import { removeNote, editNote, } from "../../actions";

import styles from "./note.css";

class ConnectedNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChange: false,
    };
    
    this.changeNote = this.changeNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  changeNote(event) {
    event.preventDefault();
    const { id, editNote, } = this.props;
    const { text, } = this.state;
    const changeNote = { id, text,};
    
    editNote(changeNote);

    this.setState({
      isChange: false,
    });
  }

  handleChange() {
    const { children, } = this.props;
    
    this.setState({
      isChange: true,
      text: children,
    }); 
  }

  render() {
    const { isChange, text, } = this.state;
    const { children, id, removeNote, } = this.props;
    return (
      isChange ? (
        <form onSubmit={this.changeNote}>
          <input
            onChange={event => this.setState({
              text: event.target.value,
            })}
            type="text"
            value={text}
          />
          <button type="submit">save</button>
        </form>
      ) : (
        <div className={styles.note}>
          <span>
            {children}
          </span>
          <div className={styles.action}>
            <button
              className={styles.edit}
              onClick={this.handleChange}
              type="submit"
            >
              i
            </button>
            <button
              className={styles.remove}
              onClick={() => removeNote(id)}
              type="submit"
            >
              x
            </button>
          </div>
        </div>
      )
    )
  }
}

ConnectedNote.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
  removeNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
};

// const ConnectedNote = props => {
//   const { children, id, removeNote, editNote, } = props;
//   return (
//     <div className={styles.note}>
//       <div>
//         <span>
//           {children}
//         </span>
//         <div className={styles.action}>
//           <button
//             className={styles.edit}
//             onClick={() => editNote({ id, text: children, })}
//             type="submit"
//           >
//             i
//           </button>
//           <button
//             className={styles.remove}
//             onClick={() => removeNote(id)}
//             type="submit"
//           >
//             x
//           </button>
//         </div>
//       </div>	
//     </div>
//   );
// };

// ConnectedNote.propTypes = {
//   id: PropTypes.number.isRequired,
//   children: PropTypes.node.isRequired,
// removeNote: PropTypes.func.isRequired,
// editNote: PropTypes.func.isRequired,
// };

const mapStateToProps = state => {
  return { notes: state.notes, };
};

const mapDispatchToProps = dispatch => {
  return {
    removeNote: note => dispatch(removeNote(note)),
    editNote: note => dispatch(editNote(note)),
  };
};

const Note = connect(mapStateToProps, mapDispatchToProps)(ConnectedNote);

export default Note;