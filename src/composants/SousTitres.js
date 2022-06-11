import React from "react";
import PartTitle from "./PartTitle";

class SousTitre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.givenKey
        }
    }

    render() {
        return (
            <div className="p-2 d-grid gap-2 ">
                <PartTitle titre = "Sous titre"></PartTitle>

                <input className="  form-control" type='text' placeholder="Entre le titre "
                    ref={this.props.reference1} id="sous titre" />

                <input className=" form-control" type='text' placeholder="Entre le numero du titre"
                    ref={this.props.reference2} />

                <button type="text" className='col-6 ms-auto btn btn-danger ' onClick={() => this.props.onDeleteElt(this.state.key)}> Supprimer</button>
                <br />
            </div>
        );
    }
}

export default SousTitre;