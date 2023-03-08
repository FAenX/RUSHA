import React, {useReducer, useState} from 'react';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux';

const initialState = {
        id: '',
        email: '',
        first_name: '',
        last_name: '',
};

interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
}

interface UserState {
    user: User | null;
}

export type UserAction = {
    type: 'SET_USER';
    user: UserState;
 };
    

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
        state = action.payload
    },
  },
});


export default userSlice.reducer;

  
type ProviderProps = {
    children: React.ReactNode;
};

type ContextType = {
    user: User;
    setUser: (user: User) => void;
};


export const UserContext = React.createContext<ContextType>({
    user: initialState,
    setUser: () => {},
});

const { setUser} = userSlice.actions;

export const UserProvider: React.FC<ProviderProps> = ({children}) => {

    const dispatch = useDispatch();
    const handleSetUser =(user: User)=> {
        dispatch(setUser(user));
    }

    const state = useSelector((state: RootState) => state);
    console.log(state)

    const user = useSelector((state: RootState) => state.user);

    return (
        <UserContext.Provider value={{
            user: user,
            setUser: handleSetUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}


