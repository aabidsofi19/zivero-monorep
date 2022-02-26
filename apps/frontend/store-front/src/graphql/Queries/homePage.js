import gql from "graphql-tag";

const LoadMainData = gql`
  query HomePageState {
    filters {
      brands {
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

    MensTrending: Products(filter: { gender: "MEN" }) {
      products {
        ...productFields
      }
    }

    WomenTrending: Products(filter: { gender: "WOMEN" }) {
      products {
        ...productFields
      }
    }
    NewArrivals: Products {
      products {
        ...productFields
      }
    }
  }

  fragment productFields on ProductType {
    id
    available
    name

    price
    discountPercent
    images
    brand {
      name
      id
    }
  }
`;

export { LoadMainData };
