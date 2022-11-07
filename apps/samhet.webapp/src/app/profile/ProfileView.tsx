import { useQuery } from "@apollo/client";
import { Sheet, Typography } from "@mui/joy"
import { useParams } from "react-router-dom";
import { ProfileByDisplayNameQuery, PROFILE_BY_DISPLAY_NAME } from "./profileQueries";

export const ProfileView = () => {
  const { displayNameParam } = useParams();
  const {data, loading, error} = useQuery<ProfileByDisplayNameQuery>(
    PROFILE_BY_DISPLAY_NAME,
    {variables: {displayName: displayNameParam}}
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{JSON.stringify(error)}</Typography>;
  }

  if(!data || !data.profileByDisplayName) {
    return <Typography>{displayNameParam} not found</Typography>;
  }
  const {displayName} = data.profileByDisplayName;

  return <Sheet>
    <Typography level="h1" >
      {displayName}
    </Typography>
  </Sheet>
}
