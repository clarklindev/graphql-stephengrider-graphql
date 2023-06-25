import gql from 'graphql-tag';

export default gql`
  mutation LikeLyrics($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
