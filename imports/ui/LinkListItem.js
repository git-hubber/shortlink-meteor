import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinkListItem extends Component {
  state = { copied: false, visible: this.props.visible };

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);

    this.clipboard
      .on('success', () => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 1000);
      })
      .on('error', () => {
        alert('Unable to copy');
      });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  toggleHide = () => {
    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
  };

  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${moment(
        this.props.lastVisitedAt,
      ).fromNow()})`;
    }

    return (
      <p className="item__message">
        {this.props.visitedCount} {visitMessage} {visitedMessage}
      </p>
    );
  }

  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a
          className="button button--pill button--link"
          href={this.props.shortUrl}
          target="_blank"
        >
          Visit
        </a>
        <button
          className="button button--pill"
          ref="copy"
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.copied ? 'Copied' : 'Copy'}
        </button>

        <button className="button button--pill" onClick={this.toggleHide}>
          {this.props.visible ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}
