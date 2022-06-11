import React from "react";

class TestRef extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         key : this.props.giveKey 
      };
    };
    

    render() {
        return (
            <div>
                <input type="text"  ref={this.props.referenceInput}  />
                <input type="button" value='supprime' onClick={()=> this.props.onSupprimeElt(this.state.key)} />
            </div>
        );
    }
}

export default TestRef;