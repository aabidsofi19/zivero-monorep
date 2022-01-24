import gql from "graphql-tag"


export const AutoCompleteResults = gql`
   query AutoCompleteResults($search: String!) {
       productAutocompleteResults(search: $search) {
         Id
         name
         variations{
             price
             images
         }
         
       }
   }
`


export const SearchResults = gql`

    query SearchResults($search: String!,$pageNo: Int) {
        productSearchResults(search: $search,pageNo: $pageNo) {
            page
            totalResults
            totalPages
            results{
                Id
                name
                brand
                category
                variations{
                    price
                    discountPercent
                    images
                }
            }
        }
    }
`

