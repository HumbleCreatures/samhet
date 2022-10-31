import { Button } from "@mui/joy"
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../state/store"

export const ProfileBadge = () => {
  const navigate = useNavigate();
  const selectedProfile = useAppSelector((state) => state.profile.selectedProfile)
  if(!selectedProfile) {
    return <div>No profile</div>
  }
  return <Button onClick={() => navigate('/app/profile/edit')}>{selectedProfile?.displayName}</Button>
 }
