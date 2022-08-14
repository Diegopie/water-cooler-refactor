import React, { useEffect, useState } from 'react';
import SearchResults from '../SearchResults';
import SearchContext from '../../../context/SearchContext';
import { newSearchDB } from '../server.search.api';
import { BsSearch } from 'react-icons/bs';
import { Container, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './SearchModal.css';

function SearchModal(props) {
    // * States
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [userID, setUserID] = useState([]);

    // * Connect to DB with User's Search
    const fetchSearch = () => {
        setSearchResults([]);
        newSearchDB(searchQuery)
            .then((data) => {
                if (!data) {
                    toast.warning('No match 😮', {
                        position: toast.POSITION.TOP_CENTER
                    });
                    return;
                }
                setSearchResults(data);
            });
        
    };
    
    // * Listen to Page Load To Get User ID from Local Storage
    useEffect(() => {
        if (localStorage.getItem('USER') !== null) {
            const { _id } = JSON.parse(localStorage.getItem('USER'));
            setUserID(_id);
        }
    }, []);


    // add contexts to where the component is referenced

    return (
        <SearchContext.Provider value={{ fetchSearch, searchResults, userID }}>
            <Modal {...props} backdrop='static' keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title />
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <form
                            className='SearchModal-form'
                            onSubmit={e => {
                                e.preventDefault();
                                console.log('handleSearch');
                            }}>
                            <div className='SearchModal-input-wrap'>
                                <label htmlFor='search'>
                                    <BsSearch size={15} style={{ fill: 'grey' }} />
                                </label>

                                <input
                                    className='SearchModal-input'
                                    required
                                    id='search'
                                    name='searchQuery'
                                    value={searchQuery}
                                    placeholder='Search For Users ...'
                                    type='text'
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                className='SearchModal-btn'
                                type='submit'
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchSearch();
                                }}
                            >
                                Search
                            </button>
                        </form>
                        <section className='mt-5'>
                            <SearchResults />
                        </section>
                    </Container>
                </Modal.Body>
                <Modal.Footer className='SearchModal-footer' />
            </Modal>
        </SearchContext.Provider>
    );
}

export default SearchModal;
