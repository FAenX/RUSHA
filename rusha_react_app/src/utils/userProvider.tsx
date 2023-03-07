import React, {useReducer} from 'react';

const userInitialState = {
    id: '',
    name: '',
    email: '',
    role: '',
    createdAt: '',
    updatedAt: '',
};

export type UserState = typeof userInitialState;

export type UserAction = {
type: 'SET_USER';
user: UserState;
};


export const userReducer = (state = userInitialState, action: UserAction) => {
switch (action.type) {
    case 'SET_USER':
    return {
        ...state,
        user: action.user,
    };
    default:
    return state;
}
};

type CounterProviderProps = {
    children: React.ReactNode;
  };



type CounterContextType = {
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
};


export const UserContext = React.createContext<CounterContextType>({
    state: userInitialState,
    dispatch: () => {},
});

export const UserProvider: React.FC<CounterProviderProps> = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, userInitialState);
    const value = { state, dispatch };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
