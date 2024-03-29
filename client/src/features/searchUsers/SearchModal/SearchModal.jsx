import React, { useState } from 'react';
import SearchResults from '../SearchResults';
import SearchContext from '../../../context/SearchContext';
import { searchDB } from '../server.search.api';
import { BsSearch } from 'react-icons/bs';
import { Container, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './SearchModal.css';

function SearchModal(props) {
    // * States
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // * Connect to DB with User's Search
    const fetchSearch = () => {
        searchDB(searchQuery)
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
    
    return (
        <SearchContext.Provider value={{ fetchSearch, searchResults }}>
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
