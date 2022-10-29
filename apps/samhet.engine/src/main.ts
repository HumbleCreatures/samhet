import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { RecipeResolver } from './app/recipe-resolver';

const main = async () => {

  const schema = await buildSchema({
    resolvers: [RecipeResolver],
  });

  const server = new ApolloServer({
    schema
  });

  const port = process.env.port ? Number(process.env.port) : 3333;

  const {url} =  await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      const userId = req.headers['x-user-id'] || null;
      if(!userId) {
        throw new Error("No user id");
      }
      return { user:{ id: userId} };
    },
    listen: { port: port },
  })

  console.log(`🚀  Server ready at: ${url}`);

};

main();




