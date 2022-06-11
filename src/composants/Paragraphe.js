import React from "react";
import PartTitle from "./PartTitle";

class Paragraphe extends React.Component {
    constructor(props) {
        super(props);
        this.state = { key: this.props.givenKey }
    }


    render() {
        return (

            <div className="p-2 d-grid gap-2 ">
                <PartTitle titre="Paragraphe"></PartTitle>

                <textarea className="  form-control" type='text' placeholder="Entre le paragraphe"
                    ref={this.props.reference} id='paragraphe' style={{ height: '120px' }} />
                <button type="button" className=' col-6 ms-auto btn btn-danger ' onClick={() => this.props.onDeleteElt(this.state.key)}> Supprimer</button>
                <br />
            </div>
        );
    }
}

export default Paragraphe;