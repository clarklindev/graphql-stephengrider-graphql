import React, { Component } from 'react';
import { Link } from 'react-router';

import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;

    if (this.props.data.loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

// graphql intercepting props and work with it before passing through to SongDetail
export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
