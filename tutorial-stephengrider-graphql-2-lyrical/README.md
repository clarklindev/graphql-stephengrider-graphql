# Lyrical-GraphQL

## installation

- uninstall "mongoose": "^4.7.8"
- npm i mongoose@6.3.6

Starter project from a GraphQL course on Udemy.com

## Apollo Provider / Apollo Store

- CLIENT - the store communicates with graphql server and stores the data

```js
import ApolloClient from 'apollo-client';
```

- PROVIDER - the "provider" speaks with the frontend (react) and takes data from the "store"

```js
import { ApolloProvider } from 'react-apollo';
```

then...

```js
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Hello</div>
    </ApolloProvider>
  );
};
```

## Graphql-tag

- allows us to use graphql queries in js
- it is a dependency of apollo-client, no need to install.
- example: access query results from: this.props.data.songs
- use this.props.data.loading to check if something has been completed loading

```js
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
```

## mutations

- pass query variables to inject values from outside to inside the query
- customizes the mutation by giving mutation a

```
name($parameter:type){
  addSong(parameter:$parameter){
  }
}
```

## mutation on graphiQL

- receives query variable

```
mutation AddSong($title:String){
  addSong(title: $title){
    id
    title
  }
}
```

## queryvariables on graphiQL

- passes into mutation

```
{
  "title": "hello world"
}
```

## query variables in REACT

- gives you access to "this.props.mutate({variables:{title:this.state.title}})" which invokes the function tied to query
- pass to mutate function() a variables property which has properties that we want to pass into the mutation

```js
import { graphql } from 'react-apollo';
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
```

## forcing re-running query to fetch list (refetch() method 1)

- use this method when your query is associated with the component where you are calling props.data.refetch()

```
.then(() => this.props.data.refetch());
```

## forcing re-running query to fetch list (refetchQueries() method 2)

- add refetchQueries property to mutate() with actual query inside
- use when the query is not associated with the class where you want to refetch

```js
import query from '../queries/fetchSongs';

onSubmit(event){
  event.preventDefault();

  this.props.mutate({
    variables:{
      title: this.state.title
    },
    refetchQueries:[{query}]
  }).then(()=> hashHistory.push('/'));

}
```

## graphql intercepting props and work with it before passing through to SongDetail

- getting variable form queryparam
- pass a second {} argument to graphql() via variables

```js
export default graphql(fetchSong, {
  options: (props) => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
```

## DataIdFromObject

- dev.apollodata.com/react/cache-updates \*(normalization with dataIdFromObject)
- giving ID's to fetched content so apollo can associate data with updates by id
- required: only works when ids are unique
- required: id's given to retrieved data

```js
//index.js
const client = new ApolloClient({
  dataIdFromObject: (o) => o.id //gives id's to every record
});
```

## guessing future values with "optimisticResponse"

- apollo allows you to make data appear to update by allowing you to guess response values
  then its compared again when the actual response returns.
- we then add to optimisticResponse, \_\_typename and what the object returned will be
- incorrect guesses get overwritten by actual returned value

```js
this.props.mutate({
  variables: { id },

  //strategy to guess data to avoid delay on update
  optimisticResponse: {
    __typename: 'Mutation',
    likeLyric: {
      id,
      __typename: 'LyricType',
      likes: likes + 1
    }
  }
});
```
