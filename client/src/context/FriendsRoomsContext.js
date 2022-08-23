import { createContext, useContext, useReducer } from 'react';
import { getFriendsData } from '../services/server.friends.api';
export const FriendsContext = createContext();


const _id = JSON.parse(localStorage.getItem('USER'));


const defaultState = {
    allFriendsTwo: getFriendsData(_id, 'friends')
        .then((data) => {
            if (!data) { return []; }
            console.log(data);
            return data;
        })

    // ** Set this based off 
    // offFriends: () => {
    //     getFriendsData(_id, )
    //         .then((data) => {
    //             if (!data) { return []; }
    //             return data;
    //         });
    // },
    // inpending: () => {
    //     getFriendsData(_id, 'inpending')
    //         .then((data) => {
    //             if (!data) { return []; }
    //             return data;
    //         });
    // },
    // inpendingRooms: () => {
    //     getFriendsData(_id, 'inpendingRooms')
    //         .then((data) => {
    //             if (!data) { return []; }
    //             return data;
    //         });
    // },
    // inpendingSpaces: () => {
    //     getFriendsData(_id, 'inpendingSpaces')
    //         .then((data) => {
    //             if (!data) { return []; }
    //             return data;
    //         });
    // },
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