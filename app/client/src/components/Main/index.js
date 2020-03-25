import React from 'react';
import { Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import axios from 'axios';

//Local imports
import './styles.scss';

import Fred from './fred2.png';
import Jamy from './jamy1.png';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: this.props.isConnected,
            user:this.props.connectedUser,
            favlist: this.props.favItems
        }
        console.log('state du main', this.state, 'et racklist', this.props.rackList)
        if(window.localStorage.getItem('cool-jwt') === null){
            console.log('pas de jwt');
            this.state.isConnected = false
        } else {
            console.log('jwt detécté')
            let userId= jwtDecode((window.localStorage.getItem('cool-jwt')));
            console.log(userId._id);
            axios.get(`http://www.o-courses.eu/api/user/getuser/${userId._id}`)
            .then(res => {
              console.log('voila la réponses suite à la requete getUser', res.data, 'et la favlist', res.data.favlist)
              let newConnectedUser = {
                name: res.data.name,
                surname: res.data.surname,
                email: res.data.email
              }
              let newIsConnected = true;
              let newFavItems = res.data.favlist;
              console.log('après recup de la réponse dans après la requete getUser', newConnectedUser, newFavItems, newIsConnected)      
          
             //Je lance ma méthode pour obtenir les détails de l'user et les mettre dans le store
             this.props.setConnecterUser(newConnectedUser, newIsConnected, newFavItems);
            })
            
    }
}



    render(){
        console.log('state du main après le construct:', this.state, 'et rackList', this.props.rackList)
        return (
        <div className="mainContainer">
            <p className="navigation">▶ Accueil</p>
            {this.state.isConnected && 
            <div className="welcome">Bonjour {this.state.user.surname} !
            </div>
        }
        <div className="gradient-box">
        <div className="topSpeech">
                    
            <h2 className="slogan">On ne peut pas pousser votre caddie 
            mais on peut vous aider pour le reste !</h2>
            <div className="description">
                <div className="fred">
                    <img className="fred-img" src={Fred}/>
                    <div className="fred-text">Mais alors dis-moi Jamy, qu'est-ce que c'est O'Courses ?</div>
                </div>
            
                <div className="jamy">
                    <div className="jamy-text">O'Courses, c'est l'application qui va te faciliter la vie 
                    en te permettant de créer et gérer tes listes de courses. 
                    Parce que moins de temps à faire les courses,
                    c'est plus de temps pour manger !
                    </div>
                    <img className="jamy-img" src={Jamy}/>
                    
                    </div>
                </div>
            </div>
        </div>

                <div className="mainContent">
                    <NavLink to="/carousel" id="a" href="">
                    <div className="title">Les fruits & légumes du mois d'octobre</div>
                        <div className="box"></div>
                            <Responsive minWidth={1024}>
                            </Responsive>
                    </NavLink>
                </div>

                <div className="mainContent"><a href="">
                <div className="title">Lasagnes à l'italienne</div>
                <div className="lasagnes"> 
                    <div className="summary">
                        <ul className="recipe-items">
                            <li>- 1 Carotte </li>
                            <li>- 1 Branche de céleri </li>
                            <li>- 800gr hâché mélangé </li>
                            <li>- Sauce tomate </li>
                            <li><a>Voir plus</a></li>
                        </ul>
                        </div>    
                    </div>
                    </a>
                </div>

                <div className="mainContent"><a href="">
                    <div className="title">Crêpes au suc'</div>
                    <div className="crepes"> 
                        <div className="summary">
                        <ul className="recipe-items">
                            <li>- 300gr de farine</li>
                            <li>- 3 oeufs</li>
                            <li>- 50gr de beurre fondu</li>
                            <li>- 60cl de lait</li>
                            <li>- Du suc'</li>
                            <li><a>Voir plus</a></li>
                        </ul>
                        </div>    
                    </div>
                    </a>
                </div>

                <div className="mainContent"><a href="">
                    <div className="title">Pizza maison</div>
                    <div className="pizza"> 
                        <div className="summary">
                        <ul className="recipe-items">
                            <li>- Mortadelle</li>
                            <li>- 1 poivron</li>
                            <li>- 3 champignons</li>
                            <li>- Mozzarella</li>
                            <li><a>Voir plus</a></li>
                        </ul>
                        </div>    
                    </div>
                    </a>
                </div>
            </div>
        )
            
};
}
// Étape 1 : on définit des stratégies de connexion au store de l'app.
const connectionStrategies = connect(
    // 1er argument : stratégie de lecture (dans le state privé global)
    (state, ownProps) => {
      return {
        connectedUser: state.connectedUser,
        favItems: state.favItems,
        isConnected: state.isConnected
      };
    },
  
    // 2d argument : stratégie d'écriture (dans le state privé global)
    (dispatch, ownProps) => {
      return {
        updateState: (newState) => {
            dispatch({ type : 'UPDATE_STATE', value : newState })
        },
        setConnecterUser: (user, connected, favlist) => {
            console.log('dans mon action à dispatch', user, connected, favlist)
            dispatch({ type : 'USER_CONNECTED', value : {user, connected, favlist} })
        }
      };
    },
  );
  
  // Étape 2 : on applique ces stratégies à un composant spécifique.
  const MainContainer = connectionStrategies(Main);
  
  // Étape 3 : on exporte le composant connecté qui a été généré
  export default MainContainer;