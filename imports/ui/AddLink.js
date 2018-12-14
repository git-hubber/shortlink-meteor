import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends Component {
  state = {
    url: '',
    isOpen: false,
    error: '',
  };

  componentWillMount() {
    Modal.setAppElement('body');
  }

  onSubmit = e => {
    e.preventDefault();
    const { url } = this.state;

    console.log(url);
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({ error: err.reason });
      }
    });
  };

  onURLChange = e => {
    this.setState({
      url: e.target.value.trim(),
    });
  };

  handleModalClose = () => {
    this.setState({ url: '', isOpen: false, error: '' });
  };

  render() {
    return (
      <div>
        <Modal
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose}
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={e => this.onSubmit(e)} className="boxed-view__form">
            <input
              type="text"
              ref="url"
              placeholder="url"
              value={this.state.url}
              onChange={e => this.onURLChange(e)}
            />
            <button className="button">Add Link</button>
            <button
              className="button button--secondary"
              onClick={this.handleModalClose}
              type="button"
            >
              Cancel
            </button>
          </form>
        </Modal>
        <button
          className="button "
          onClick={() =>
            this.setState({
              isOpen: true,
            })
          }
        >
          + Add Link
        </button>
      </div>
    );
  }
}
