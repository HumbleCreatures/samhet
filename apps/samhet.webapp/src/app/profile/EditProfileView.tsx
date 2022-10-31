import { Button, Option, Select, Sheet, TextField, Typography } from "@mui/joy"
import { EditProfileInput, Gender } from "@samhet/models"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../state/store"
import { createProfile, updateProfile } from "./profileSlice"

export const EditProfileView = () => {

  const selectedProfile = useAppSelector((state) => state.profile.selectedProfile);
  const profileSaved = useAppSelector((state) => state.profile.profileSaved);
  const dispatch = useAppDispatch();

  const [editProfileState, setEditProfileState] = useState<EditProfileInput>({
    displayName: '',
    age: 0,
    city: '',
    gender: 'Female' as Gender,
  });

  useEffect(() => {
    setEditProfileState({
      displayName: selectedProfile?.displayName || '',
      age: selectedProfile?.age,
      city: selectedProfile?.city,
      gender: selectedProfile?.gender || 'Female' as Gender,
    });

   }, [selectedProfile, setEditProfileState])

   const saveProfile = () => {
    console.log('Saving profile')
    if(selectedProfile) {
      dispatch(updateProfile(editProfileState));
    } else {
      dispatch(createProfile(editProfileState));
    }
   }

  return <Sheet variant="outlined" color="neutral" sx={{ p: 4 }}>

    {selectedProfile ?
    <Typography level="h1">Edit my profile</Typography> :
    <Typography level="h1">Create profile</Typography>}

    <TextField
            name="displayName"
            type="text"
            placeholder="Display name"
            label="Display Name"
            value={editProfileState.displayName}
            onChange={(e) => setEditProfileState({...editProfileState, displayName: e.target.value})}
          />
    <TextField
            name="city"
            type="text"
            placeholder="Stockholm"
            label="City"
            value={editProfileState.city}
            onChange={(e) => setEditProfileState({...editProfileState,
              city: e.target.value})}
          />
      <TextField
            name="age"
            type="number"
            placeholder="35"
            label="Age"
            value={editProfileState.age}
            onChange={(e) => setEditProfileState({...editProfileState,
              age: parseInt(e.target.value)})}
          />

      <label htmlFor="select-button" id="select-label">Gender</label>
      <Select
        value={editProfileState.gender || 'Female'}
        onChange={(e, newValue) =>
          setEditProfileState({...editProfileState, gender: newValue as Gender})}
        componentsProps={{
          button: {
            id: 'select-button',
            'aria-labelledby': 'select-label select-button',
          }
        }}
      >
        <Option value="Female">Female</Option>
        <Option value="Male">Male</Option>
      </Select>
      <Button onClick={saveProfile}>Save</Button>
      {profileSaved ? <Typography level="h2">Profile saved!</Typography> : null}

  </Sheet>
}
