
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
    