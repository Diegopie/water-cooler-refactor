import React from 'react';
import SearchButton from '../SearchButton';
import SearchContext from '../../../context/SearchContext';
import './SearchResults.css';
import { useGlobalContext } from '../../../context/GlobalContext';

const SearchResults = () => { 
  
    const [{USER}, ] = useGlobalContext();

    return (
        <SearchContext.Consumer>
            {(context) => {
               
                return (
                    // * Map Through Users Returned From the DB
                    context.searchResults.map((returnedUser) => (
                        <article className='SearchResults-cont' key={Math.random()}>
                            <div>   
                                <img className="SearchResults-img"
                                    src={returnedUser.imageSrc}
                                    alt={returnedUser.username}
                                />
                            </div>
                            <div className='mx-3 pt-3' style={{width:200}}>
                                <p className='m-0 p-0'><strong>Username: </strong>{returnedUser.username}</p>
                                <p><strong>Name: </strong>{returnedUser.firstName} {returnedUser.lastName}</p>
                            </div>
                            {/* * Send Props to SearchButton To Conditionally Render Buttons */}
                            <SearchButton
                                fetchSearch={context.fetchSearch}
                                pending={returnedUser.pending}  
                                blocked={returnedUser.blocked}
                                friends={returnedUser.friends}
                                friendId={returnedUser.friendId}
                                userId={USER._id} 
                            />
                        </article>
                    ))
                );
            }}
        </SearchContext.Consumer>
    );
};

export default SearchResults;