import {Resolver, Query, Mutation, Arg, Ctx} from 'type-graphql-v2-fork';
import { Profile, EditProfileInput, Authentication, Pod, PodMember } from '@samhet/persistent-models';
import { AppDataSource } from '../AppDataSource';


@Resolver()
export class ProfileResolver  {

  @Query(returns => Profile, { nullable: true })
  async myPods(@Ctx("userId") userId: string): Promise<Profile | undefined> {
    // Get from database
    const memberships = await AppDataSource.getRepository(PodMember).findOneBy({profile: {id: userId}});
    return null;
  }

  @Mutation(returns => Pod)
  async generatePod(@Ctx("userId") userId: string): Promise<Profile> {
    // Get all profiles.
    // Run through algo.
    // Build pods and memerships.
    return null;
  }
}


