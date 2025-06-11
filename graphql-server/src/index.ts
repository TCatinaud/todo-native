import { ApolloServer, gql } from "apollo-server";
import { v4 as uuidv4 } from "uuid";
import { Item, items } from "./data";
// import cors from "cors";
import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();


const typeDefs = gql`
  type Item {
    id: ID!
    label: String!
    isChecked: Boolean!
  }

  input ItemInput {
    label: String!
    isChecked: Boolean!
  }

  type Query {
    items: [Item!]!
  }

  type Mutation {
    addItem(label: String!): Item!
    saveItems(items: [ItemInput!]!): [Item!]!
    toggleItem(id: ID!): Item!
    deleteItem(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    items: () => prisma.item.findMany(),
  },
  Mutation: {
    addItem: (_: any, { label }: { label: string }) => {
      const newItem: Item = { id: uuidv4(), label, isChecked: false };
      items.push(newItem);
      return newItem;
    },
    saveItems: async (
      _: any,
      { items: inputItems }: { items: { label: string; isChecked: boolean }[] }
    ) => {
      console.log("received items:", inputItems);

      const newItems = inputItems.map((item) => ({
        id: uuidv4(),
        label: item.label,
        isChecked: item.isChecked,
      }));

      await prisma.item.deleteMany(); // remplace la liste
      await prisma.item.createMany({ data: newItems });

      return await prisma.item.findMany();
    },
    toggleItem: (_: any, { id }: { id: string }) => {
      const item = items.find((i) => i.id === id);
      if (!item) throw new Error("Item not found");
      item.isChecked = !item.isChecked;
      return item;
    },
    deleteItem: (_: any, { id }: { id: string }) => {
      const index = items.findIndex((i) => i.id === id);
      if (index === -1) return false;
      items.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers, cors: { origin: "*" } });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
