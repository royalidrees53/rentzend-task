import gql from 'graphql-tag';

const ADD_AGENT = gql`
  mutation addAgent (
    $name: String!
    $email: String!
    $zipcode: String!
    $number: String!
    $address: String!
    $document: Upload!
  ) {
    createAgent (
      name: $name
      email: $email
      zipcode: $zipcode
      number: $number
      address: $address
      document: $document
    ) {
      success
      message
      agent {
        id
        name
        email
        zipcode
        address
        document
      }
    }
  }
`;

export { ADD_AGENT };
