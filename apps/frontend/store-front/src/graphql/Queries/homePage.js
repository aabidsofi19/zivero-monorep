import gql from "graphql-tag";

const LoadMainData = gql`
query HomePageState{
    
    filters {
      brands{
        id
        name
        logo
      }
      genders
      tags
      categories {
        id
        name
        image
      }
    }
    
    

    MensTrending:Products(filter: {gender:"MEN"}) {
       products {
         ...productFields
       }
    }
    
    WomenTrending:Products(filter: {gender:"WOMEN"}) {
       products {
           ...productFields
       }
    }
    BoysTrending:Products(filter: {gender:"BOYS"}) {
       products {
           ...productFields
       }
    }
}

fragment productFields on ProductType {
    id
    available
    name
    variations {
      price
      images 
      discountPercent
    }
    brand{
      name
      id
    }

}
`

export {
    LoadMainData
}