import { Alert, Button, Checkbox, Option, Select, Sheet, TextField, Typography } from "@mui/joy"
import { AvailableLocations, EditProfileInput, Gender } from "@samhet/models"
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
    lookingFor: [] as Gender[],

    location: AvailableLocations[0],
  });
  const [locationIndex, setLocationIndex] = useState(0);
  const [showSavedDialog, setShowSavedDialog] = useState(false);

  useEffect(() => {
    setEditProfileState({
      displayName: selectedProfile?.displayName || '',
      age: selectedProfile?.age,
      city: selectedProfile?.city,
      lookingFor: selectedProfile?.lookingFor || [],
      location: selectedProfile?.location || AvailableLocations[0],
    });
    const locationIndex = AvailableLocations.findIndex((l) => l.name === selectedProfile?.location.name);
    setLocationIndex(locationIndex);
    console.log(locationIndex);
   }, [selectedProfile, setEditProfileState])

   const saveProfile = () => {
    if(selectedProfile) {
      dispatch(updateProfile(editProfileState));
    } else {
      dispatch(createProfile(editProfileState));
    }
    setShowSavedDialog(true);
    setTimeout(() => {
      setShowSavedDialog(false);
     }, 5000);
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

      <label htmlFor="select-button-location" id="select-label-location">Location</label>
      <Select
      value={locationIndex || '0'}
      onChange={(e, newValue) => {
        setLocationIndex(newValue ? +newValue : 0);
        setEditProfileState({...editProfileState,
          location: AvailableLocations[newValue ? +newValue : 0]}) }}
        componentsProps={{
          button: {
            id: 'select-button-location',
            'aria-labelledby': 'select-label-location select-button-location',
          }
        }}
      >
        {AvailableLocations.map((location, index) => (<Option key={index} value={index}>{location.name}</Option>))}

      </Select>

      <label htmlFor="select-button-gender" id="select-label-gender">Gender</label>
      <Select
        value={editProfileState.gender || 'Female'}
        onChange={(e, newValue) =>
          setEditProfileState({...editProfileState, gender: newValue as Gender})}
        componentsProps={{
          button: {
            id: 'select-button',
            'aria-labelledby': 'select-label-gender select-button-gender',
          }
        }}
      >
        <Option value="Female">Female</Option>
        <Option value="Male">Male</Option>
      </Select>



      <div>
        <label id="select-label-looking-for">Looking for</label>
        <div>
        <Checkbox
                variant="solid"
                label="Males"
                checked={editProfileState.lookingFor.includes(Gender.Male)}
                onChange={(e) => {
                  if(e.target.checked) {
                    setEditProfileState({...editProfileState, lookingFor: [...editProfileState.lookingFor, Gender.Male]})
                  }

                  if(!e.target.checked) {
                    const lookingFor = editProfileState.lookingFor.filter(gender => gender !== Gender.Male);
                    setEditProfileState({...editProfileState, lookingFor});
                  }
                }}
                />
      </div>
        <Checkbox
        variant="solid"
        label="Females"
        checked={editProfileState.lookingFor.includes(Gender.Female)}
        onChange={(e) => {
          if(e.target.checked) {
            setEditProfileState({...editProfileState, lookingFor: [...editProfileState.lookingFor, Gender.Female]})
          }

          if(!e.target.checked) {
            const lookingFor = editProfileState.lookingFor.filter(gender => gender !== Gender.Female);
            setEditProfileState({...editProfileState, lookingFor});
          }
        }}
        />

      </div>
      <Button onClick={saveProfile}>Save</Button>
      {profileSaved && showSavedDialog && <Alert color="success" variant="solid">Profile saved</Alert>}
  </Sheet>
}
