import { useQuery } from "@apollo/client";
import { Profile } from "@samhet/models";
import { SocketTest } from "../chat/SocketTest";
import { ProfileCard } from "./ProfileCard";
import { ALL_PROFILES, ProfileQuery } from "./profileQueries";

export const ProfileList = () => {
  const {data, loading, error} = useQuery<ProfileQuery>(ALL_PROFILES);

  const listOfProfiles = data?.allProfiles?.map((profile:Profile) => {
    return <ProfileCard profile={profile} key={profile.id} />
   });

  return <div>
    {listOfProfiles}
    <div>
    <SocketTest />
    </div>
  </div>;
}
