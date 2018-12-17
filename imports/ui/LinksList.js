import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinkListItem';

export default class LinksList extends Component {
  state = {
    links: [],
  };

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({ visible: Session.get('showVisible') }).fetch();
      // console.log(links);
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    this.linksTracker.stop();
  }

  renderLinks = () => {
    const { links } = this.state;
    if (links.length > 0) {
      return this.state.links.map(link => {
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} {...link} shortUrl={shortUrl} />;
      });
    }
    return (
      <div className="item">
        <p className="item__status-message">No Links Found</p>
      </div>
    );
  };

  render() {
    return <div>{this.renderLinks()}</div>;
  }
}
