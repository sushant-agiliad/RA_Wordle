import {gql} from 'apollo-angular'

const GET_PROVIDEDWORDS = gql`
  query {
    providedWords {
      id
      name
    }
  }
`
// TODO: Mutation to add and delete words if needed

export {GET_PROVIDEDWORDS}