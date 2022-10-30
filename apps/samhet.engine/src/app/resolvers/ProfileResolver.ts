import {Resolver, Query, Mutation, Arg, Ctx} from 'type-graphql-v2-fork';
import { Profile, EditProfileInput, Authentication } from '@samhet/models';
import { AppDataSource } from '../AppDataSource';


@Resolver()
export class ProfileResolver  {

  @Query(returns => Profile, { nullable: true })
  async profileByProfileId(@Arg("profileId") profileId: string): Promise<Profile | undefined> {
    // Get from database
    return null;
  }

  @Query(returns => Profile, { nullable: true })
  async profileByDisplayName(@Arg("displayName") displayName: string): Promise<Profile | undefined> {
    // Get from database
    return null;
  }


  @Query(returns => [Profile], { nullable: true })
  async myProfiles(@Ctx("userId") userId: string): Promise<Profile[] | undefined> {
    // Get from database
    const authentications = await AppDataSource.getRepository(Authentication).findBy({
      authenticationId: userId,
    });

    const profileIds = authentications.map(auth => auth.profileId);
    const profiles = await AppDataSource.manager
    .createQueryBuilder(Profile, "profile")
    .where("id IN (:...profileIds)", { profileIds })
    .getMany();

    return profiles;
  }

  @Query(returns => [Profile], { description: "Get all the profiles" })
  async allProfiles(): Promise<Profile[]> {
    const allProfiles = await AppDataSource.getRepository(Profile).find();
    return allProfiles;
  }

  @Mutation(returns => Profile)
  async createProfile(@Arg("profile") profileInput: EditProfileInput, @Ctx("userId") userId: string): Promise<Profile> {

    const profile = new Profile(profileInput);
    let savedProfile: Profile = null;
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      savedProfile = await transactionalEntityManager.save(profile);
      const authentication = new Authentication();
      authentication.profileId = savedProfile.id;
      authentication.authenticationId = userId;
      authentication.authenticationName = "fake";
      await transactionalEntityManager.save(authentication);
    });

    return savedProfile;
  }

  async updateProfile(@Arg("profile") profileInput: EditProfileInput, @Ctx("profileId") profileId: string): Promise<Profile> {
    if(!profileId) {
      throw new Error("No profile selected");
    }
    return null;
  }

}


