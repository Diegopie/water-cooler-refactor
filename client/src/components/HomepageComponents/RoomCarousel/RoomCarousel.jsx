import React, {useState} from 'react';
import roomStyles from '../../../data/productionRoomStyles';
import {Carousel, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../../../utils/GlobalContext';
import './RoomCarousel.css';

function RoomCarousel() {
   
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    // eslint-disable-next-line
    const [{roomStyle}, dispatch] = useGlobalContext();
    
    const handleSetRoomStyle = (style) => {
        dispatch({type: 'setRoomStyle', payload: style.src });
        localStorage.setItem('roomImg', style.src);
        toast.dark(` 🥳 You selected ${style.title} style!!`, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    return (
        <Col xs={12} lg={5} md={6} className='pb-3' >   
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {
                    roomStyles.map((style, i) => (
                        <Carousel.Item key={i}>
                            <h3 className='text-center text-muted'>Choose A Room Style</h3>
                            <img
                                className="RoomCarousel-img d-block w-100"
                                src={style.src}
                                alt={style.title}
                                onClick={() => handleSetRoomStyle(style)}
                            />
                        
                            <h4 className='text-center text-muted'>{style.title}</h4>
                       
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </Col>
    );
}

export default RoomCarousel;
