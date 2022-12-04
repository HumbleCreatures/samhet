import { useQuery } from "@apollo/client";
import { Sheet, Typography } from "@mui/joy"
import { useParams } from "react-router-dom";
import { ProfileCard } from "../profile/ProfileCard";
import { GetPodData, GET_POD } from "./podQueries";

export const PodView = () => {
  const { podIdParam } = useParams();
  const {data, loading, error} = useQuery<GetPodData>(
    GET_POD,
    {variables: {getPodId: podIdParam}}
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{JSON.stringify(error)}</Typography>;
  }

  if(!data || !data.getPod) {
    return <Typography>{podIdParam} not found</Typography>;
  }
  const {displayName, members} = data.getPod;

  const listOfMembers = members.map((member) => { 
    return <ProfileCard profile={member.profile} key={member.profile.id} /> 
});

  return <Sheet>
    <Typography level="h1" >
      {displayName}
      {listOfMembers}
    </Typography>
  </Sheet>
}
