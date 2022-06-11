import React from 'react';

const PartTitle = (props) => {
    return (
        <div className='d-grid justify-content-center  '>
            <h3 className='cardifColorGreen'> {props.titre} </h3>
        </div>
    );
};

export default PartTitle;