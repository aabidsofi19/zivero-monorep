import gql from "graphql-tag";

export const UPDATE_FILTERS= gql`
mutation updateFilters($gender:String,$categories:[String],$brands:[String]){
  updateFilters(filter:{
    gender:$gender
  	categories:$categories
    brands:$brands
    
  }
  ){
    updatedFilters{
      genders
      categories{
        id
        name
      }
      brands{
        id
        name
      }  
    }
  }
}`