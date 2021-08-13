import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Tabnav from '../Tabnav';
import {useGlobalContext} from '../../../utils/GlobalContext.js';
import './Slider.css';

function Slider() {

    const [{showAside}, dispatch] = useGlobalContext();

    return (
        <>
            {showAside && <section className='mx-0 px-0 '>
                <aside className={showAside ? 'Sidenav-menu active' : 'Sidenav-menu'}>
                    <div className='Sidenav-menu-items d-flex flex-column' >
                        <div 
                            onClick={ () => {
                                dispatch({type: 'setShowAside', payload: false});
                            }}
                            className='Sidenav-toggle' 
                        >
                            <Link to='#' className='Header-menu-bars'>
                                <AiFillCloseCircle style={{fill: 'greenyellow'}}/>
                            </Link>
                        </div>
                        <Tabnav />
                    </div>
                </aside>
            </section>}
        </>
    );
}

export default Slider;
