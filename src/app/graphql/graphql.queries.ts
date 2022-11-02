import {gql} from 'apollo-angular'

const GET_PROVIDEDWORDS = gql`
  query {
    providedWords {
      id
      name
    }
  }
`

const GET_NEWWORD = gql`
  query ProvidedWords {
    providedWords {
      id
      name
    }
  }
`
const GET_ISVALIDWORD = gql`
  query ProvidedWords($word: String!) {
    validWord(word: $word)
  }
`;

// TODO: Mutation to add and delete words if needed

export {GET_PROVIDEDWORDS,GET_NEWWORD,GET_ISVALIDWORD}