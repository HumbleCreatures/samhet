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
    listen: { port: port },
  })

  console.log(`🚀  Server ready at: ${url}`);

};

main();




