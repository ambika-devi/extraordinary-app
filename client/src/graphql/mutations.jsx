// mutations.js
import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user { username role }
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!, $role: String!) {
    signup(username: $username, password: $password, role: $role) {
      id
      username
      role
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;


// Add this to mutations.js
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String
    $role: String
    $age: Int
    $class: String
    $subjects: [String]
    $attendance: Float
    $email: String
    $phone: String
  ) {
    updateEmployee(
      id: $id
      name: $name
      role: $role
      age: $age
      class: $class
      subjects: $subjects
      attendance: $attendance
      email: $email
      phone: $phone
    ) {
      id
      name
      role
      age
      class
      subjects
      attendance { percentage }
      email
      phone
    }
  }
`;

