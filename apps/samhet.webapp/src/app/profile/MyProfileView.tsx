import { useAppSelector } from "../state/store";
import {
  Navigate,
} from "react-router-dom";

export const MyProfileView = () => {
  const selectedProfile = useAppSelector((state) => state.profile.selectedProfile)

  if (!selectedProfile) {
    return <Navigate to="/app/profile/edit" />
  }

  const {displayName, age, city} = selectedProfile;

  return <div>
    <h1>Welcome {displayName}</h1>
    <div>Age: {age}</div>
    <div>City: {city}</div>
  </div>
}
