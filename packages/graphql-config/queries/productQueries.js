import gql from 'graphql-tag';

export const  GET_PRODUCTS_QUERY=gql`
query Product($filter:FilterInput,$page:Int!){
  Products(
        filter:$filter 
        pageNb:$page){
            totalPages
            totalProducts
            pageNo
            products{
                id
                name
                brand{
                    id
                    name
                }
                category{
                    name
                    id
                }
                variations{
                    Id
                    price
                    discountPercent
                    images
                    variant{
                        name
                        value
                    }
                }
            }
    }
}
`
export const  GET_PRODUCT_QUERY=gql`
query product($id:String!){
  product(id:$id){
            id
            name
            brand{
                id
                name
            }
            category{
                name
                id
            }
            availableVariants

            variations{
                Id
                price
                discountPercent
                images
                variant{
                    name
                    value
                }
            }
    }
}
`
export const GET_CATEGORIES=gql`
query{
  categories{
    name
    description
    id
  }
}
`
