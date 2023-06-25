import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

import { graphql } from 'react-apollo';

import mutation from '../queries/addSong';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('hello props: ', this.props);

    //mutate function on props - receives all variables we want to pass to mutation
    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [{ query }] //update list
      })
      .then(() => {
        hashHistory.push('/');
      });
  }

  render() {
    return (
      <div>
        <Link to="/">back</Link>
        <h3>create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song title:</label>
          <input
            onChange={(event) => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(SongCreate);
