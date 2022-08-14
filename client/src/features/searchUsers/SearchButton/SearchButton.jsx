import React from 'react';
import { sendFriendRequest } from '../server.search.api';
import './SearchButton.css';

const SearchButton = (props) => {
    // * Send IDs of user and invited to server to make friend req
    const fetchSendFriendRequest = (id) => {
        sendFriendRequest(id, props.userId)
            .then();
    };
    // * Default Button To Render
    // change to dispatch and reducer for props
    // create state for the database values
    let button =
        <button  
            className='SearchButton-send SearchButton-btn'
            onClick={async e => {
                e.preventDefault();
                await fetchSendFriendRequest(props.friendId);
                props.fetchSearch();
            }}
        >Send Friend Request</button>;
    
    // * Check if User Has Already Sent a Request to Change Button Render
    props.pending.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-pend SearchButton-btn'
                    onClick={e => e.preventDefault()}
                >Friend Request Pending</button>;
        }
    });

    // * Check if User is already Friends to Change Button Render
    props.friends.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-msg SearchButton-btn'
                    onClick={e => e.preventDefault()}
                >Already Friends!</button>;
        }
    });

    // * Check User has Been Blocked by this Search to Change Button Render
    props.blocked.forEach(searchedUser => {
        if (searchedUser === props.userId) {
            button =
                <button
                    className='SearchButton-msg SearchButton-btn'
                    onClick={e => e.preventDefault()}
                >You have been blocked</button>;
        }
    });

    return (
        <> {button} </>

    );
};

export default SearchButton;