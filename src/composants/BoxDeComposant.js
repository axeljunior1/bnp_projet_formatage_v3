import React from 'react';

const BoxDeComposant = (props) => {


    return (
        <div className=''>
            <div className="  px-1">
                <button type="button" className="text-bold col-12 btn btn-outline-primary" onClick={() => props.choix_btn(0)}>Sous Titre  </button>
            </div>
            <div className="row pt-2 p-0 m-0 ">
                <div className="col-6  px-1">
                    <button type="button" className="text-bold col-12 btn btn-outline-primary" onClick={() => props.choix_btn(1)}>  Paragraphe </button>
                </div>
                <div className="col-6  pe-0 ps-2">
                    <button type="button" className="text-bold  col-12 btn btn-outline-primary" onClick={() => props.choix_btn(2)}> Liste</button>
                </div>
            </div>
            <div className="row pt-2 p-0 m-0 ">
                <div className="col-6  px-1">
                    <button type="button" className=" text-bold col-12 btn btn-outline-primary" onClick={() => props.choix_btn(3)} >Video </button>
                </div>
                <div className="col-6  pe-0 ps-2">
                    <button type="button" className=" text-bold col-12 btn btn-outline-primary" onClick={() => props.choix_btn(4)}> Box Bon a savoir </button>
                </div>
                <div className="  px-1 pt-5">
                    <a type="button" className="text-bold col-12 btn btn-success" href="#floatingTextarea2" onClick={() => props.choix_btn(5)}> Valider le Formulaire </a>
                </div>
            </div>
        </div>
    );
};

export default BoxDeComposant;
