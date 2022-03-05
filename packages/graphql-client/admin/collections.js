import gql from 'graphql-tag'

export const CategoryFragment = {
  category: gql`
    fragment CategoryFragment on CategoryType {
      id
      brands {
        id
        name
      }
      description
      image
      name
      genders
    }
  `,
}

const BrandFragment = gql`
  fragment BrandFragment on BrandType {
    id
    name
    logo
  }
`

export const createCategory = gql`
  mutation createCategory($input: CategoryInput!) {
    createCategory(input: $input) {
      category {
        ...CategoryFragment
      }
    }
  }

  ${CategoryFragment.category}
`

export const updateCategory = gql`
  mutation updateCategory($id: String!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
      category {
        ...CategoryFragment
      }
    }
  }
  ${CategoryFragment.category}
`

export const deleteCategory = gql`
  mutation deleteCategory($id: String!) {
    deleteCategory(id: $id) {
      success
    }
  }
`

export const createBrand = gql`
  mutation createBrand($input: BrandInput!) {
    createBrand(input: $input) {
      brand {
        ...BrandFragment
      }
    }
  }
  ${BrandFragment}
`

export const updateBrand = gql`
  mutation updateBrand($id: String!, $input: BrandInput!) {
    updateBrand(id: $id, input: $input) {
      brand {
        ...BrandFragment
      }
    }
  }
  ${BrandFragment}
`

export const deleteBrand = gql`
  mutation deleteBrand($id: String!) {
    deleteBrand(id: $id) {
      brand {
        ...BrandFragment
      }
    }
  }
  ${BrandFragment}
`

export const createVariant = gql`
  mutation createVariant($input: VariantInput!) {
    createVariant(input: $input) {
      variant {
        id
        name
        value
      }
    }
  }
`
export const updateVariant = gql`
  mutation updateVariant($id: String!, $input: VariantInput!) {
    updateVariant(id: $id, input: $input) {
      variant {
        id
        name
        value
      }
    }
  }
`

export const deleteVariant = gql`
  mutation deleteVariant($id: String!) {
    deleteVariant(id: $id) {
      variant {
        id
      }
    }
  }
`
