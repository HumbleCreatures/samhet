import { Button, Card, Typography } from "@mui/joy"
import { Profile } from "@samhet/models"
import { useNavigate } from "react-router-dom";

export const ProfileCard = ({profile}:{profile:Profile}) => {
  const navigate = useNavigate();
  const gotToProfile = () => {
    navigate(`/app/profile/${profile.displayName}`);
  }
  return <Card variant="outlined" sx={{ width: 320 }}>
    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
      {profile.displayName}
    </Typography>
    <Typography level="body2">Age: {profile.age}</Typography>
    <Typography level="body2">Gender: {profile.gender}</Typography>
    <Button onClick={gotToProfile}>Go to profile</Button>
  </Card>
 }
