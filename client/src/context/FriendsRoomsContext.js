import { createContext, useContext, useReducer, useState } from 'react';
import { getFriendsData } from '../services/server.friends.api';
import { useGlobalContext } from './GlobalContext';

export const FriendsContext = createContext();

const [{ USER },] = useGlobalContext;
const _id = USER._id;





const defaultState = {
    inpending: () => {
        getFriendsData(_id, )
            .then((data) => {
                if (!data) { return []; }
                return data;
            });
    },
    offFriends: () => {
        getFriendsData(_id, )
            .then((data) => {
                if (!data) { return []; }
                return data;
            });
    },
    allFriends: () => {
        getFriendsData(_id, )
            .then((data) => {
                if (!data) { return []; }
                return data;
            });
    },
    inpendingRooms: () => {
        getFriendsData(_id, )
            .then((data) => {
                if (!data) { return []; }
                return data;
            });
    },
};

const reducer = (state, action) => {
    // These came from global context, update so that they can call the api for each state value
    switch (action.type) {
        case 'getAll':
            return {
                ...state,
                rooms: action.payload,
                socialSpaces: action.payload
            };
        case 'popOne':
            return {
                ...state,
                currentRoom: action.payload,
                currentSocialSpace: action.payload
            };
        case 'setShowAside':
            return {
                ...state,
                showAside: action.payload
            };
        case 'setRoomStyle':
            return {
                ...state,
                roomStyle: action.payload
            };
        case 'setUser':
            return {
                ...state,
                USER: action.payload
            };
        default: return state;
    }
};

const FriendsProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return (
        <FriendsContext.Provider value={[state, dispatch]} {...props} />
    );

};

export default FriendsProvider;

export const useFriendsContext = () => {
    return useContext(FriendsContext);
};