const axios = require('axios');
const gql = require('graphql');
const GraphQLSchema = gql.GraphQLSchema;
const GraphQLObjectType = gql.GraphQLObjectType;
const GraphQLString = gql.GraphQLString;
const GraphQLList = gql.GraphQLList;
const SubBreed = require('./subBreed');
const { GraphQLInt } = require('graphql/type');

const Breed = new GraphQLObjectType({
  name: 'Breed',
  fields: {
    name: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    subBreed: {
      type: SubBreed,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve (breed, args) {
        return {
          name: args.name,
          parentName: breed.name
        }
      }
    },
    allSubBreeds: {
      type: new GraphQLList(SubBreed),
      resolve (breed) {
        return axios.get(`http://dog.ceo/api/breed/${breed.name}/list`)
          .then(result => {
            return result.data.message.map(
              name => {
                return {
                  name: name,
                  parentName: breed.name
                }
              }
            )
          })
      }
    },
    allImages: {
      type: new GraphQLList(GraphQLString),
      args: {
        limit: {
          type: GraphQLInt
        }
      },
      resolve (breed, args) {
        return axios.get(`http://dog.ceo/api/breed/${breed.name}/images`)
          .then(result => {
            return result.data.message.slice(0, args.limit);
          })
      }
    },
    randomImage: {
      type: GraphQLString,
      resolve (breed) {
        return axios.get(`http://dog.ceo/api/breed/${breed.name}/images/random`)
          .then(result => {
            return result.data.message;
          })
      }
    }
  }
})

module.exports = Breed;