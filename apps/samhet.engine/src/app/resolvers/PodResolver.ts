import {Resolver, Query, Mutation, Arg, Ctx} from 'type-graphql-v2-fork';
import { Profile, Pod, PodMember } from '@samhet/persistent-models';
import { AppDataSource } from '../AppDataSource';
import { GetValuesFromProfile } from '../../clustering/clusteringValues';
import * as clustering from 'density-clustering';
import { MembershipType, PodMemberStatus } from '@samhet/models';
import { faker } from '@faker-js/faker';



@Resolver()
export class PodResolver  {

  @Query(returns => [PodMember], { nullable: true })
  async myPodMemberships(@Ctx("profileId") profileId: string): Promise<PodMember[] | undefined> {
    // Get from database
    const memberships = await AppDataSource.getRepository(PodMember).createQueryBuilder("podMember")
    .where("podMember.profile.id = :profileId", { profileId })
    .leftJoinAndSelect("podMember.pod", "pod")
    .getMany()
    return memberships;
  }

  @Query(returns => Pod, { nullable: true })
  async getPod(@Ctx("profileId") profileId: string, @Arg("id") id: string): Promise<Pod | undefined> {
    // Get from database
    const pods = await AppDataSource.getRepository(Pod).createQueryBuilder("pod")
    .where("pod.id = :id", { id })
    .leftJoinAndSelect("pod.members", "podMember")
    .leftJoinAndSelect("podMember.profile", "profile")
    .getMany()
    
    if(pods.length === 0) {
      return undefined;
    }

    const selectedPod = pods[0];

    const isMember = selectedPod.members.some(m => m.profile.id === profileId);
    if(!isMember) {
      return undefined;
    }

    console.log(JSON.stringify(selectedPod));

    return selectedPod;
  }

  @Mutation(returns => Pod)
  async generatePod(@Ctx("profileId") profileId: string): Promise<Pod> {

    const profiles = await AppDataSource.getRepository(Profile).find();
    const profileIndex = profiles.findIndex(p => p.id === profileId);
    const userDataSet = profiles.map(profiles => { 
      return GetValuesFromProfile(profiles);
    });

    const kmeans = new clustering.KMEANS();
    const clusters = kmeans.run(userDataSet, 8);
    const clusterIndex = clusters.findIndex(c => c.includes(profileIndex));
    const cluster = clusters[clusterIndex];
    const clusterProfiles = cluster.map((index:number) => profiles[index]);
    const pod = new Pod();
    pod.displayName = faker.science.chemicalElement().name + ' ' + faker.animal.type();
    const newPod = await AppDataSource.manager.save(pod);
    const podMembers = clusterProfiles.map(profile => { 
      const podMember = new PodMember();
      podMember.profile = profile;
      podMember.pod = newPod;
      podMember.status = PodMemberStatus.Primary;
      podMember.membershipType = MembershipType.Algorithm;
      return podMember;
    });
    await AppDataSource.manager.save(podMembers);

    return newPod;
  }

  @Mutation(returns => Pod)
  async createPod(@Ctx("profileId") profileId: string): Promise<Pod> {
    const profile = await AppDataSource.getRepository(Profile).findOneBy({id: profileId});
    if(!profile) {
      throw new Error("Profile not found");
    }
    const pod = new Pod();
    const newPod = await AppDataSource.manager.save(pod);
   
    const podMember = new PodMember();
    podMember.profile = profile;
    podMember.pod = newPod;
    podMember.status = PodMemberStatus.Primary;
    podMember.membershipType = MembershipType.Algorithm;
    
    await AppDataSource.manager.save(podMember);

    return newPod;
  }
}


