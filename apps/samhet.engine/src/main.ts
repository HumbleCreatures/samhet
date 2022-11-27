import "reflect-metadata";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql-v2-fork';
import { AppDataSource } from "./app/AppDataSource";
import { ProfileResolver } from "./app/resolvers/ProfileResolver";
import { PodResolver } from "./app/resolvers/PodResolver";


const main = async () => {

  await AppDataSource.initialize()
    .catch((error) => console.log(error))

  const schema = await buildSchema({
    resolvers: [ProfileResolver, PodResolver],
  });

  const server = new ApolloServer({
    schema
  });

  const port = process.env.port ? Number(process.env.port) : 3333;

  const {url} =  await startStandaloneServer(server, {
    context: async ({ req }) => {
      const userId = req.headers['x-user-id'] || null;
      if(!userId) {
        throw new Error("No user id");
      }

      const profileId = req.headers['x-profile-id'] || null;
      return { userId, profileId };
    },
    listen: { port: port },
  })

  console.log(`🚀  Server ready at: ${url}`);

};

main();




