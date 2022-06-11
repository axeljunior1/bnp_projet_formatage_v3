import React from "react";
import PartTitle from "./PartTitle";

class Videographie extends React.Component {
    constructor(props) {
        super(props);
    this.state = {key : this.props.givenKey}

    }
    render() {
        return (
            <div className="p-2 d-grid gap-2 ">
                <PartTitle titre="Video"></PartTitle>

                <textarea className="form-control" ref={this.props.reference}
                    id="video" style={{ height: '120px' }} placeholder='Entre l iframe' />
                <button type="button" className=' col-6 ms-auto btn btn-danger ' onClick={() => this.props.onDeleteElt(this.state.key)}> Supprimer</button>
                <br />
            </div>
        );
    }
}

export default Videographie;