import { Authentication, PodMember, Profile, Pod } from '@samhet/persistent-models';
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Profile, Authentication, Pod, PodMember],
  subscribers: [],
  migrations: [],
})
