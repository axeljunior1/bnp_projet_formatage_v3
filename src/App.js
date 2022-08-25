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
            valeur += format_paragraphe(i[1].current.value)
          }

          if (i[1].current.id === 'liste') {
            valeur += format_liste(i[1].current.value)
          }
          if (i[1].current.id === 'video') {
            valeur += formatVideo(i[1].current.value)
          }

          if (i[1].current.id === 'asavoir') {
            valeur += Format_Box_A_Savoir(i[1].current.value)
          }
        }
        if (i[1].length === 2 && i[1][0].current.value !== "") {
          // certains composants necessite de leur passer deux ref donc on y accede comme dans un tableau a 2 dimenssions 

          if (i[1][0].current.id === 'sous titre') {
            valeur += format_sous_titre(i[1][0].current.value, i[1][1].current.value)
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


// fonctions de conversion. 

// cette fonction récupère un texte et y ajoute des balises html de paragraphe necessaires 
function format_paragraphe(params) {
  let table_paragraphe = params.split('\n') // transforme le texte en tableau de paragraphe
  let resultat_paragraphes = []
  table_paragraphe.forEach(element => {
    if (element.length !== 0) { //  paragraphe vide ?  
      resultat_paragraphes.push('<p>\n\t' + element + '\n</p>\n\n') // add <p> ... </p> à chaque paragraphe 
    }
  });

  return resultat_paragraphes.join(' '); // joint tous les paragraphes

}

// formater un sous titre  
function format_sous_titre(params, num) { // fonction qui prend en parametre un titre et un numero de titre 
  //  remplace les accents dans notre titre afin de constituer l'id du sous titre  
  let id = params.replaceAll('é', 'e')
    .replaceAll('è', 'e')
    .replaceAll('à', 'a')
    .replaceAll('ô', 'o')
    .replace(/[^A-Za-z0-9\s]/g, "").replace(/\s{2,}/g, " ").trim() // remplace les caracteres non alphanumerique par "", 
    // "  " = " " , retire les espaces au debut et de  fin avec la methode trim() , // 
    .replaceAll(" ", "-") // " " == "-"
    .toLowerCase(); // texte en minuscule 
  let format_title = '<div class="d-flex">\n\t<span class="title-number h3 text-fuchsia z-depth-5">\n\t\t' + num + '\n\t</span>\n\t<h2 class="text-primary"'
    + 'id="' + id + '">\n\t\t' + params + '\n\t</h2>\n</div>\n\n' // ajouts des balises autour des valeurs de variable 

  return (
    format_title
  );
}

function format_liste(text) {
    let ul_debut = '<ul class="list-styled list-bullet-primary">'
    let ul_Fin = '\n</ul>\n\n'
    let liste_elt_li = []
    text.split('\n').forEach(element => { //chaque paragraphe du texte constitue un element de liste 
      if (element.length !== 0) {
          liste_elt_li.push('\n\t<li>' + element + '</li>')// si l'element est non nul, on l'entoure des balises <li> ... </li>   
      }
    });
    let result_liste_html = ul_debut +  liste_elt_li.join(' ') + ul_Fin // ajout des <ul> autour de tous nos <li> precedents
    return result_liste_html
  
  }

// le premier paragraphe du texte en paramettre constitue le titre de du box
  function Format_Box_A_Savoir(textValue) {
    let table_paragraphe = textValue.split('\n') 
    let table_resultat = []
    table_resultat.push('<div class="bg-grey-10 p-5 mb-5" >\n\t<h3 class="text-primary">\n\t\t')
    table_resultat.push(table_paragraphe[0])
    table_resultat.push('\n\t</h3> \n\t<p>\n\t\t')
    for (let index = 1; index < table_paragraphe.length; index++) {
      table_resultat.push(table_paragraphe[index])
    }
    table_resultat.push('\n\t</p> \n</div>\n')
    return table_resultat.join(' ')
  }


function formatVideo(iframe) {
    //A modifier pour entrer la bonne valeur et le style qui va avec les iframes 
    return iframe + '\n'
  }

export default App;
