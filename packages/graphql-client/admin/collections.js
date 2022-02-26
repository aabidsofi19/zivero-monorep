import gql from 'graphql-tag'

// export const CategoryFragment = {
//   category: gql`
//     fragment CategoryFragment on CategoryType {
//       id
//       brands {
//         id
//         name
//       }
//       description
//     }
//   `,
// }

export const createCategory = gql`
  mutation createCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      category {
        #       ...CategoryFragment
        id
      }
    }
  }
`

// export const updateCategory = gql`
//    mutation updateCategory($id:Int!,$input:CategoryInput!){
//        updateCategory(id:$id,input:$input){
//               ${CategoryFragment}
//        }
//    }
// `

// export const deleteCategory = gql`
//   mutation deleteCategory($id: Int!) {
//     deleteCategory(id: $id) {
//       success
//     }
//   }
// `

// export const fetchCategories = gql`
//   query categories(
//     $offset: Int
//     $first: Int
//     $userId: ID
//     $isActive: Boolean
//     $isArchived: Boolean
//     $isVerified: Boolean
//   ) {
//     categories(
//       offset: $offset
//       first: $first
//       user: $userId
//       user_Status_Verified: $isVerified
//       user_Status_Archived: $isArchived
//       user_IsActive: $isActive
//     ) {
//       pageInfo {
//         hasNextPage
//         startCursor
//       }
//       edges {
//         node {
//           id
//           ${CategoryFragment}
//         }
//       }
//     }
//   }
// `

// export const fetchBrands = gql`
//   query brands {
//     brands {
//       id
//       name
//     }
//   }
// `
