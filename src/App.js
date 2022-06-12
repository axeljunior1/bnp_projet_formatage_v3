import React from "react";
import "./App.css";
import BoxDeComposant from "./composants/BoxDeComposant";
import Header from "./composants/Header";
import Paragraphe from "./composants/Paragraphe";
import Liste from "./composants/Liste";
import SousTitre from "./composants/SousTitres";
import Videographie from "./composants/Videographie";
import BoxASavoir from "./composants/BoxASavoir";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueToScreen: '',
      // var qui va etre incrementé quand on ajoute un Composant (paragraphe, liste, sous titre, video....) 
      increment_nbre_elts: 0

    };

    //Creation d'un tableau de reference qui va correspondre a chaque composant 
    this.Ref = new Map()


    this.choix_btn = this.choix_btn.bind(this);
    this.deleteElt = this.deleteElt.bind(this);

  }
  // map ui contient tous mes Composant (paragraphe, liste, sous titre, video....)
  Map_All_Elt = new Map();

  // Choix composant a ajouter dans le rendu 
  choix_btn(e) {
    this.choix_elt_fct_btn(e)
  }

  //suppression de composant au click d'un btn (e) designe quel btn a éte cliqué
  deleteElt(e) {

    this.setState({
      valueToScreen: this.state.valueToScreen
    })
    //retire de la table de Ref cette reference
    if (this.Ref.has(e)) {
      this.Ref.delete(e)
    } else {
      console.log('lelement a supprimer n est pas present dans matable de reference')
    }
    //retire de la map de Compposant le composant qui a pour cle (e) 
    this.Map_All_Elt.delete(e)
  }


  FromMapToArray = (map) => {
    let array = []
    let iteration = map.values()
    for (let index = 0; index < map.size; index++) {
      array.push(iteration.next().value)
    }
    return array;
  };

  //Fonction  qui definit ce qui est fait lorqu'on clique sur une btn de la BoxDeComposant
  choix_elt_fct_btn(choix) {

    // choix 5 pour valider le formulaire
    if (choix === 5) {
      let valeur = ''
      for (let i of this.Ref) {
        if (i[1].length !== 2 && i[1].current.value && i[1].current.value !== "") {

          if (i[1].current.id === 'paragraphe') {
            valeur += trf_paragraphe(i[1].current.value)
          }

          if (i[1].current.id === 'liste') {
            valeur += formatListe(i[1].current.value)
          }
          if (i[1].current.id === 'video') {
            valeur += formatVideo(i[1].current.value)
          }

          if (i[1].current.id === 'asavoir') {
            valeur += FormatBosA_Savoir(i[1].current.value)
          }
        }
        if (i[1].length === 2 && i[1][0].current.value !== "") {
          // certains composants necessite de leur passer deux ref donc on y accede comme dans un tableau a 2 dimenssions 

          if (i[1][0].current.id === 'sous titre') {
            valeur += trf_sousTitre(i[1][0].current.value, i[1][1].current.value)
          }
        }
      }
      this.setState({
        valueToScreen: valeur
      })

    } else {

      //ajout sous titre
      if (choix === 0) {
        //cree une ref pour l'object  suivre, et on l'ajoute dans le tableau de reference 
        this.Ref.set(this.state.increment_nbre_elts, [React.createRef(), React.createRef()])

        //on passe la ref au composant et on stoque ce composant dan la variable elt_to_add
        let elt_to_add = <SousTitre onDeleteElt={this.deleteElt} givenKey={this.state.increment_nbre_elts}
          reference1={this.Ref.get(this.state.increment_nbre_elts)[0]} key={this.state.increment_nbre_elts}
          getNumTitle={this.reference_du_numero_de_titre} reference2={this.Ref.get(this.state.increment_nbre_elts)[1]} />

        //ajout de le composant au map cle = l'etat de la variable d'incrementation  valeur => composant crée
        this.Map_All_Elt.set(this.state.increment_nbre_elts, elt_to_add)
      }

      // choix 1 pour ajouter un parragraphe 
      if (choix === 1) {
        this.Ref.set(this.state.increment_nbre_elts, React.createRef())

        let elt_to_add = <Paragraphe reference={this.Ref.get(this.state.increment_nbre_elts)}
          givenKey={this.state.increment_nbre_elts} onDeleteElt={this.deleteElt}
          key={this.state.increment_nbre_elts} />

        //ajout de l'element  au map 
        this.Map_All_Elt.set(this.state.increment_nbre_elts, elt_to_add)
      }

      // choix 2 pour ajouter une liste  
      if (choix === 2) {
        this.Ref.set(this.state.increment_nbre_elts, React.createRef())

        let elt_to_add = <Liste onDeleteElt={this.deleteElt} givenKey={this.state.increment_nbre_elts}
          reference={this.Ref.get(this.state.increment_nbre_elts)} key={this.state.increment_nbre_elts} />

        this.Map_All_Elt.set(this.state.increment_nbre_elts, elt_to_add)
      }

      // choix 3 pour ajouter une video
      if (choix === 3) {
        this.Ref.set(this.state.increment_nbre_elts, React.createRef())

        let elt_to_add = <Videographie onDeleteElt={this.deleteElt} givenKey={this.state.increment_nbre_elts}
          reference={this.Ref.get(this.state.increment_nbre_elts)} key={this.state.increment_nbre_elts} />

        this.Map_All_Elt.set(this.state.increment_nbre_elts, elt_to_add)
      }

      if (choix === 4) {
        this.Ref.set(this.state.increment_nbre_elts, React.createRef())

        let elt_to_add = <BoxASavoir onDeleteElt={this.deleteElt} givenKey={this.state.increment_nbre_elts}
          reference={this.Ref.get(this.state.increment_nbre_elts)} key={this.state.increment_nbre_elts} />

        this.Map_All_Elt.set(this.state.increment_nbre_elts, elt_to_add)
      }
      this.setState({
        increment_nbre_elts: this.state.increment_nbre_elts + 1
      })
    }

  }

  render() {
    return (
      <div className="">
        <Header> </Header>
        <div className="container p-2 border">
          <div className="row">
            <div className="col-6  ps-1 pe-0">
              {this.FromMapToArray(this.Map_All_Elt).map((e) => e)}
              <br></br>

              <BoxDeComposant choix_btn={this.choix_btn} />
            </div>

            <div className="col-6">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  readOnly
                  defaultValue={this.state.valueToScreen}
                  id="floatingTextarea2"
                  style={{ height: "1000px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



// fonctions de conversion 

function trf_paragraphe(params) {
  let t = params.split('\n')
  let t1 =[]
  t.forEach(element => {
    if (element.length !==0) {
      t1.push('<p>\n\t' + element + '\n</p>\n\n')
    }

  });

  return  t1.join(' ');
    
}


function trf_sousTitre(params, num) {

  let id = params.replaceAll('é', 'e')
  id = id.replaceAll('è', 'e')
  id = id.replaceAll('à', 'a')
  id = id.replaceAll('ô', 'o')
  id = id.replace(/[^A-Za-z0-9\s]/g, "").replace(/\s{2,}/g, " ").trim();
  id = id.replaceAll(" ", "-")
  id = id.toLowerCase();
  let v = '<div class="d-flex">\n\t<span class="title-number h3 text-fuchsia z-depth-5">\n\t\t' + num + '\n\t</span>\n\t<h2 class="text-primary"'
    + 'id="' + id + '">\n\t\t' + params + '\n\t</h2>\n</div>\n\n'

  return (
    v
  );
}

function formatListe(arr) {
  let ul = '<ul class="list-styled list-bullet-primary">'
  let ulFin = '\n</ul>\n\n'
  let t = []
  arr.split('\n').forEach(element => {
    if (element.length !==0) {
      t.push('\n\t<li>' + element + '</li>')      
    }
  });
  let res = ul + t.join(' ') + ulFin
  return res

}

function formatVideo(iframe) {
  //A modifier pour entrer la bonne valeur et le style qui va avec les iframes 
  return iframe + '\n'
}

function FormatBosA_Savoir(textValue) {
  let table = textValue.split('\n')
  let t = []
  t.push('<div class="bg-grey-10 p-5 mb-5" >\n\t<span class="h3 text-primary">\n\t\t')
  t.push(table[0])
  t.push('\n\t</span> \n\t<p>\n\t\t')
  for (let index = 1; index < table.length; index++) {
    t.push(table[index])
  }
  t.push('\n\t</p> \n</div>\n')

  return t.join(' ')

}

export default App;


