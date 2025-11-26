import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int) {
    getEmployees(page: $page, limit: 10) {
      employees {
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
      totalPages
    }
  }
`;
