import React from 'react';
import { Container } from 'react-bootstrap';
import {Circles} from 'react-loader-spinner';

function Loading() {
    return (
        <Container className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: 250}}>

            <h2>Tired of Zoom? </h2>
            <h2 className='mb-5' style={{fontFamily: 'Audiowide', color:'orangered'}}>Try WaterCooler</h2>
            <Circles type="Circles" color="#00BFFF" height={150} width={150} />

        </Container>
    );
}

export default Loading;
