import React from "react";
import TestRef from "./TestRef";



class TestDesRef extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: ''
        }
        this.afficheLaValDesBtn = this.afficheLaValDesBtn.bind(this)
        this.supprimeElt = this.supprimeElt.bind(this)

        this.myref = []
        for (let index = 0; index < 4; index++) {
            this.myref[index] = React.createRef()
        }

        for (let index = 0; index < 4; index++) {
            this.t_tests.set(index, <TestRef referenceInput={this.myref[index]} key={index} giveKey={index}  onSupprimeElt= {this.supprimeElt} ></TestRef>);
        }
    }

    t_tests = new Map()

    FromMapToArray = (map) => {
        let array = []
        let iteration = map.values()
        for (let index = 0; index < map.size; index++) {
            array.push(iteration.next().value)
        }
        return array ; 
    };
    

    afficheLaValDesBtn() {
        console.log(this.t_tests.size)
        console.log(this.myref)
        this.setState({
            valid: ''
        })
        for (let index in this.myref) {
            console.log(this.myref[index].current.value)
        }

        console.log(this.FromMapToArray(this.t_tests))
    }


    supprimeElt(e){
        this.setState({
            valid: ''
        })
        console.log(e)
        this.t_tests.delete(e) 
        this.myref.splice(e,1)  
    }



    render() {
        return (
            <div>
                {
                    this.FromMapToArray(this.t_tests).map((e) => e)
                }
                <input type="button" value="Mon btn" onClick={this.afficheLaValDesBtn} />
            </div>
        );
    }
}

export default TestDesRef;