import React, { Component } from 'react';
import Modal from 'react-modal';

class Window extends Component {

  render() {
    return (
    <Modal
      isOpen={this.props.showModal}
      onRequestClose={this.props.onRequestClose}
      contentLabel={"Example Modal"}
    >
      <h1>"Modal Content"</h1>
      <p>"Some text here..."</p>
      <button onClick={this.props.onRequestClose}>Close Modal</button>
    </Modal>
    );
  }
}

export default Window;