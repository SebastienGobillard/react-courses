import React from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import CreatedList from 'src/components/CreatedList';
import CreatedRackContainer from 'src/components/CreatedRack';
import * as jwtDecode from 'jwt-decode';

//Local import 
import './CreateList.scss';





class CreateList extends React.Component{

    constructor(props) {
        super(props);
        console.log('props reçu', props);
        console.log('rackList:', props.rackList)
        this.state = {
            listName: '',
            product: '',
            rack: '',
            quantity: '',
            fav: false,
            id: 0,
            shopped: false,
        }
        let isConnected = false
        let favdisplay = false;

        
        
        if(window.localStorage.getItem('cool-jwt') === null){
            console.log('pas de jwt');
        } else {
            console.log('jwt detécté')
            let userId= jwtDecode((window.localStorage.getItem('cool-jwt')));
            console.log(userId._id);
            this.isConnected = true,
            console.log('state de CreateList après connexion', this.state, 'et isConnected?', this.isConnected, 'et favlist', this.props.favItems) 
  
        }
    }

    changeFavDisplay =() => {
        this.favdisplay = !this.favdisplay;
        this.setState({state: this.state})
    }
    
componentDidMount(){
    console.log('cdm favlist', this.props.favItems)
}

// Méthode ajoutant le produit à la list des items du state.
    handleSubmit = () => {
        console.log('HandleSubmit lancé');
        console.log(this.state)
        if(this.state.id === 0){
            this.state.id = Math.random(1,1000)
        } else {
            this.state.id = this.state.id;
        }
        this.props.addItem(this.state)
        this.setState({product: '',
        rack: '',
        quantity: '',
        fav: false,
        id: 0,
        shopped: false
    })
    }  

    deleteItem = (...props) => {
        const isDelete = isHidden ? true : false;
    }

 
//Méthode permettant d'intégrer les valeurs indiquées par l'User dans l'objet NewItem
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value,
        })
    }
    
    handleListSave = () => {
        event.preventDefault();
        let userId= jwtDecode((window.localStorage.getItem('cool-jwt')));
        console.log('click sur enregistrement', 'nom de la liste', this.state.listName, 'tableau des rayons', this.props.rackList, 'tableau des items', this.props.itemList)
        axios.post(`http://www.o-courses.eu/api/user/newlist/${userId._id}`, {listName: this.state.listName, racks: this.props.rackList, products: this.props.itemList})
        .then( res => {
            console.log('réponse reçu', res.data)
            this.props.history.push('/listes')
        })
    }

    erase = () => {
        this.props.eraseList();
        this.setState({product: '',
        rack: '',
        quantity: '',
        fav: false,
        id: 0,
        shopped: false
    })
    }


    render() {
        return  <div className="mainListContainer">
    <form className="inputs" onSubmit={(event) => {this.handleListSave()}}> 
        <input type="text" className="form" icon="search" placeholder="Nom de votre liste" value={this.state.listName} name="listName" id="listName" onChange={(e) => this.handleChange(e, 'listName')}/>         
    </form>
            {/* Input de recherche */}
    <form className="inputs" onSubmit= { (e) => { 
             e.preventDefault();
             this.handleSubmit() }}>

    <input type="text" className="input" icon="search" placeholder="Produit recherché..." value={this.state.product} name="product" id="product"  onChange={(e) => this.handleChange(e, 'product')}/>
        <select className="input" icon="cart" name="rack" id="rack" value={this.state.rack} onChange={(e) => this.handleChange(e, 'rack')} >
            <option value="">--Categorie / Rayon--</option>
            <option value="Animaux">Animaux</option>
            <option value="Autres">Autres</option>
            <option value="Bébé">Bébé</option>
            <option value="Bio">Bio</option>
            <option value="Biscuits">Biscuits</option>
            <option value="Boissons alcoolisées">Boissons alcoolisées</option>
            <option value="Boissons">Boissons</option>
            <option value="Boulangerie">Boulangerie</option>
            <option value="Confiserie">Confiserie</option>
            <option value="Epicerie">Epicerie</option>
            <option value="Fruits &amp; Légumes">Fruits &amp;Légumes</option>
            <option value="Hygière">Hygiène</option>
            <option value="Poissons">Poissons</option>
            <option value="Produits frais">Produits frais</option>
            <option value="Produits Ménagers">Produits Ménagers</option>
            <option value="Surgelés">Surgelés</option>w
            <option value="Viandes">Viandes</option>
            <option value="Viennoiseries">Viennoiseries</option>
        </select>
            <input type="text" className="input" icon=""   placeholder="Quantité" name="quantity" id="quantity" value=   {this.state.quantity} onChange={(e) => this.handleChange(e,    'quantity')}/>
        <button type="submit">Ajouter</button>   
    </form>
    <div className="save-button">
        <button onClick={()=> this.handleListSave()}>Sauvegarder la Liste</button>
        <button onClick={() => this.erase()} className="delete-button">Effacer la Liste</button>
    </div>
    
    {
    
    this.isConnected && 
        <div className="favorites">
            <h2 className="favs-title" onClick={ () => this.changeFavDisplay()}>Vos favoris</h2>
                {/* Faire un map sis.favClass}ur la liste des favoris que j'obtiendrais du state */}
        <div className={this.favdisplay? 'favs' : 'favs-hidden'}>
            <ul>
                {/*console.log(this.props.favItems)*/}
                    
                    {this.props.favItems.map(item => {
                            

                            return <li key={item.id} className="favs-li" onClick={ () => {
                                this.setState({
                                    product: item.product,
                                    rack: item.rack,
                                    fav: true,
                                    id: item.id,
                                    shopped: false,
                                })
                            
                        }
                            }>{item.product}</li>
                        })}
                        </ul>
                </div>
            </div>
        }
        {this.props.rackList.length > 0 &&
            this.props.rackList.map( (rack, index) => {
                return <CreatedRackContainer 
                        key={index}
                        rack={rack}
                        />
            })
        }
        
    </div>


    
}
}

// Étape 1 : on définit des stratégies de connexion au store de l'app.
const connectionStrategies = connect(
    // 1er argument : stratégie de lecture (dans le state privé global)
    (state, ownProps) => {
      return {
        ...state
      };
    },
  
    // 2d argument : stratégie d'écriture (dans le state privé global)
    (dispatch, ownProps) => {
      return {
        updateState: (newState) => {
            dispatch({ type : 'UPDATE_STATE', value : newState  })
        },
        addRackName: (name) => {
            dispatch({ type: 'NEW_RACK', value: name })
        },
        deleteItem: (id) => {
            console.log('dans deleteItem id: ', id);
          dispatch( {type: "DELETE_ITEM", value: id} );
        },
        addItem: (item) => {
            console.log('dans addItem, ajout de ', item)
            dispatch( {type: "ADD_ITEM_TO_LIST", value: item})
        },
        eraseList: () => {
            dispatch({ type: 'ERASE_LIST'})
        }
        
      };
    },
  );
  
  // Étape 2 : on applique ces stratégies à un composant spécifique.
  const CreateListContainer = connectionStrategies(CreateList);
  
  // Étape 3 : on exporte le composant connecté qui a été généré
  export default CreateListContainer;

