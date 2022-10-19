import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
    name: string,
    id: string,
}

type UserState = { 
    currentUser: User | null,
}

const initialState: UserState = {currentUser: null};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
        localStorage && localStorage.setItem('currentUser', JSON.stringify(action.payload));
        state.currentUser = action.payload;
    },
    hydrateCurrentUser: state => {
        const currentUserString = localStorage && localStorage.getItem('currentUser');
        if(currentUserString) {
            state.currentUser = JSON.parse(currentUserString);
        }        
    },
    removeCurrentUser: state => {
        localStorage && localStorage.removeItem('currentUser');
        state.currentUser = null;
    }
  }
})

export const { setCurrentUser, removeCurrentUser } = userSlice.actions

