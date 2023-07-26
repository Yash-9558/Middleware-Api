const { gql } = require('apollo-server');

module.exports = gql`
  type ProductDetails {
    Product_ID:Int!
    Product_Name: String!
    MRP: Int!
    Rating: Int!
    Number_of_orders: Int!
  }

  input ProductInput {
    Product_ID:Int!
    Product_Name: String!
    MRP: Int!
    Rating: Int!
    Number_of_orders: Int!
  }

  type Query {
    getAllXML: String!
    getAllJSON: [ProductDetails!]!
    getProductJSON(Product_ID: Int!): ProductDetails!
    getProductXML(Product_ID: Int!): String!
  }

  type Mutation {
    AddProduct(details: ProductInput!): ProductDetails!
  }
`;