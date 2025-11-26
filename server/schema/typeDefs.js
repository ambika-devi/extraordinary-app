const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Attendance { percentage: Float }

  type Employee {
    id: ID!
    name: String!
    role: String
    age: Int
    class: String
    subjects: [String]
    attendance: Attendance
    email: String
    phone: String
  }

  type EmployeePage {
    employees: [Employee]
    totalCount: Int
    totalPages: Int
  }

  type User {
    id: ID!
    username: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getEmployees(page: Int, limit: Int): EmployeePage
  }

 type Mutation {
  signup(username: String!, password: String!, role: String!): User!
  login(username: String!, password: String!): AuthPayload
  deleteEmployee(id: ID!): String
  updateEmployee(
    id: ID!
    name: String
    role: String
    age: Int
    class: String
    subjects: [String]
    attendance: Float
    email: String
    phone: String
  ): Employee
}

`;

module.exports = typeDefs;
