import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends Component {
  state = { showVisible: true };

  handleOnChange = e => {
    this.setState(prevState => ({
      showVisible: !prevState.showVisible,
    }));

    Session.set('showVisible', !this.state.showVisible);
  };

  // componentDidMount() {
  //   this.tracker = Tracker.autorun(() => {
  //     this.setState({
  //       showVisible: Session.get('showVisible'),
  //     });
  //   });
  // }

  // componentWillUnmount() {
  //   this.tracker.stop();
  // }

  render() {
    return (
      <div>
        <label className="checkbox">
          <input
            className="checkbox__box"
            type="checkbox"
            onChange={e => this.handleOnChange(e)}
            checked={!this.state.showVisible}
          />
          Show hidden links
        </label>
      </div>
    );
  }
}
