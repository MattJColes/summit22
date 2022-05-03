/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmojiFeedback = /* GraphQL */ `
  mutation CreateEmojiFeedback(
    $input: CreateEmojiFeedbackInput!
    $condition: ModelEmojiFeedbackConditionInput
  ) {
    createEmojiFeedback(input: $input, condition: $condition) {
      id
      location
      emoji
      createdAt
      updatedAt
    }
  }
`;
export const updateEmojiFeedback = /* GraphQL */ `
  mutation UpdateEmojiFeedback(
    $input: UpdateEmojiFeedbackInput!
    $condition: ModelEmojiFeedbackConditionInput
  ) {
    updateEmojiFeedback(input: $input, condition: $condition) {
      id
      location
      emoji
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmojiFeedback = /* GraphQL */ `
  mutation DeleteEmojiFeedback(
    $input: DeleteEmojiFeedbackInput!
    $condition: ModelEmojiFeedbackConditionInput
  ) {
    deleteEmojiFeedback(input: $input, condition: $condition) {
      id
      location
      emoji
      createdAt
      updatedAt
    }
  }
`;
