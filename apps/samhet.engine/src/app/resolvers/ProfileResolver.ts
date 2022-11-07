import {Resolver, Query, Mutation, Arg, Ctx} from 'type-graphql-v2-fork';
import { Profile, EditProfileInput, Authentication } from '@samhet/persistent-models';
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
    const profile = await AppDataSource.getRepository(Profile).findOneBy({displayName});
    return profile;
  }


  @Query(returns => [Profile], { nullable: true })
  async myProfiles(@Ctx("userId") userId: string): Promise<Profile[] | undefined> {
    const authentications = await AppDataSource.getRepository(Authentication).findBy({
      authenticationId: userId,
    });

    if(authentications.length === 0) {
      return undefined;
    }

    const profileIds = authentications.map(auth => auth.profileId);
    console.log(profileIds);
    const profiles = await AppDataSource.manager
    .createQueryBuilder(Profile, "profile")
    .where("id IN (:...profileIds)", { profileIds })
    .getMany();

    return profiles;
  }

  @Query(returns => [Profile], { description: "Get all the profiles" })
  async allProfiles(): Promise<Profile[]> {
    const allProfiles = await AppDataSource.getRepository(Profile).find();
    console.log(allProfiles);
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

  @Mutation(returns => Profile)
  async updateProfile(@Arg("profile") profileInput: EditProfileInput, @Ctx("profileId") profileId: string): Promise<Profile> {
    if(!profileId) {
      throw new Error("No profile selected");
    }

    const profile = await AppDataSource.getRepository(Profile).findOneBy({id: profileId});
    if(!profile) {
      throw new Error("No profile selected");
    }

    Object.assign(profile, profileInput);
    const savedProfile = await AppDataSource.manager.save(profile);

    return savedProfile;
  }

}


