/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEmojiFeedback = /* GraphQL */ `
  query GetEmojiFeedback($id: ID!) {
    getEmojiFeedback(id: $id) {
      id
      location
      emoji
      createdAt
      updatedAt
    }
  }
`;
export const listEmojiFeedbacks = /* GraphQL */ `
  query ListEmojiFeedbacks(
    $filter: ModelEmojiFeedbackFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmojiFeedbacks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        location
        emoji
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
