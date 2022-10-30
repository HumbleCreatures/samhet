import { useQuery } from "@apollo/client"
import { Profile } from "@samhet/models";
import { GET_MY_PROFILES, MyProfilesData } from "./profileQueries"

export const MyProfileView = () => {
  const {data , loading, error} = useQuery<MyProfilesData>(GET_MY_PROFILES);
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }

  if (!data || !data.myProfiles || data.myProfiles.length === 0) {
    return <div>No profile found.</div>
  }



  const {displayName, age, city} = data.myProfiles[0];

  return <div>
    <h1>Welcome {displayName}</h1>
    <div>Age: {age}</div>
    <div>City: {city}</div>
  </div>
}
