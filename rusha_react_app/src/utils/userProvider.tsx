import React, {useReducer, useState} from 'react';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux';


interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    projectId: string;
};

interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload
    },
  },
});


const { setUser} = userSlice.actions;

  
type ProviderProps = {
    children: React.ReactNode;
};

type UserContextType = {
    user: User | null;
    setUser: (user: User) => void;
};


export const UserContext = React.createContext<UserContextType>({
    user: null,
    setUser: () => {}
});

export const UserProvider: React.FC<ProviderProps> = ({children}) => {

    const dispatch = useDispatch();
    const handleSetUser =(user: User)=> {
        dispatch(setUser(user));
    }

    const user = useSelector((state: RootState) => state.user.user);

    return (
        <UserContext.Provider value={{user, setUser: handleSetUser }}>
            {children}
        </UserContext.Provider>
    )
}


export default userSlice.reducer;

