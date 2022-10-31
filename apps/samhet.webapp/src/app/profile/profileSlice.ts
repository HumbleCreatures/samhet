import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditProfileInput, Profile } from '@samhet/models';
import { client } from '../graphClient';
import { removeCurrentUser } from '../state/userSlice';
import { CREATE_PROFILE, GET_MY_PROFILES, MyProfilesData, UPDATE_PROFILE } from './profileQueries';

type ProfileState = {
    selectedProfile: Profile | null,
    myProfiles: Profile[],
    profilesLoaded: boolean,
    editProfileLoading?: boolean,
    profileSaved?: boolean;
}

const initialState: ProfileState = {
  selectedProfile: null,
  myProfiles:[],
  profilesLoaded: false
};

export const fetchProfiles = createAsyncThunk(
  'profile/fetchProfiles',
  async () => {
    const response = await client.query<MyProfilesData>({
      query: GET_MY_PROFILES,
    });

    return response.data.myProfiles;
  }
);


export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (editProfileInput: EditProfileInput) => {
    await client.mutate({
      mutation: UPDATE_PROFILE,
      variables: { profile: editProfileInput },
      refetchQueries: [{ query: GET_MY_PROFILES }]
    });

    await client.resetStore();

    const response = await client.query<MyProfilesData>({
      query: GET_MY_PROFILES,
    });

    return response.data.myProfiles;
  }
);

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (editProfileInput: EditProfileInput) => {

    await client.mutate({
      mutation: CREATE_PROFILE,
      variables: { profile: editProfileInput },
      refetchQueries: [{ query: GET_MY_PROFILES }]
    });

    await client.resetStore();

    const response = await client.query<MyProfilesData>({
      query: GET_MY_PROFILES,
    });

    return response.data.myProfiles;
  }
);


export const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfiles.fulfilled, (state, action: PayloadAction<Profile[]>) => {
      state.myProfiles = action.payload;
      if(action.payload && action.payload.length > 0) {
        state.selectedProfile = action.payload[0];
      }
      state.profilesLoaded = true;
      return state;
    })
    builder.addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile[]>) => {
      state.myProfiles = action.payload;
      if(action.payload && action.payload.length > 0) {
        state.selectedProfile =  {...action.payload[0]};
      }
      state.profilesLoaded = true;
      state.profileSaved = true;
      return state;
    })
    builder.addCase(createProfile.fulfilled, (state, action: PayloadAction<Profile[]>) => {
      state.myProfiles = action.payload;
      if(action.payload && action.payload.length > 0) {
        state.selectedProfile = {...action.payload[0]};
      }
      state.profilesLoaded = true;
      state.profileSaved = true;
      return state;
    })
    .addCase(removeCurrentUser, (state, action) => {
      state.myProfiles = [];
      state.selectedProfile = null;
      state.profilesLoaded = false;
      return state;
    });
  },
})

//export const { } = profileSlice.actions

