const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require('graphql')

// Hard code data
const data = [
  {
    id: 'aberdeen',
    name: 'Aberdeen',
    url: '/Aberdeen.htm',
    status: 'active',
  },
  {
    id: 'adamscountychristian',
    name: 'Adams County Christian',
    url: '/Adamscountychristian.htm',
    status: 'active',
  },
]

// Team Type
const TeamType = new GraphQLObjectType({
  name: 'Team',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
})

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    teams: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TeamType))),
      resolve: () => data,
    },
    team: {
      type: TeamType,
      args: {
        id: { type: GraphQLString },
        resolve: (parent, args) => {
          const res = data
          if (args.id) {
            return res.filter((team) => team.id === args.id)
          }
          return res
        },
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
