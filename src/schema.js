/**
 * @typedef { import("@prisma/client").PrismaClient } Prisma
 * @typedef { import("@prisma/client").UserCreateArgs } UserCreateArgs
 */

const { makeExecutableSchema } = require('apollo-server')
const { DateTimeResolver } = require('graphql-scalars')

const typeDefs = `
type Mutation {
  updateUserPosition(userEmail: String!, data: UserPositionUpdateInput!): User
}

input UserPositionUpdateInput {
  position: Position!
}

type Query {
  allUsers: [User!]!
}

enum Position {
  CEO
  HR
  PEON
  SALES
}

type User {
  email: String!
  id: Int!
  name: String
  position: Position!
  friendedBy: [User!]
  friendedTo: [User!]
}
`

const resolvers = {
  Query: {
    /**
     * @param {any} _parent
     * @param {any} _args
     * @param {{ prisma: Prisma }} context
     */
    allUsers: (_parent, _args, context) => {
      return context.prisma.user.findMany()
    },
  },
  Mutation: {
    /**
     * @param {any} _parent
     * @param {{data: {position: string}}} args
     * @param {{ prisma: Prisma }} context
     */
     updateUserPosition: (_parent, args, context) => {
      return context.prisma.user.update({
        where: { email: args.userEmail || undefined },
        data: {
          position: args.data.position,
        },
      });
    },
  },
  User: {
    /**
     * @param {{ id: number }} parent
     * @param {any} args
     * @param {{ prisma: Prisma }} ctx
     */
     friendedBy: (parent, args, ctx) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .friendedBy()
    },
    friendedTo: (parent, args, ctx) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .friendedTo()
    },
  },
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})

module.exports = {
  schema,
}
