import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';


/**
* Local import
*/
import Logo from '../../../../../Ressources/Images/logo.png';

// Composants enfants éventuels


// Styles et assets
import './styles.sass';
import './../App/App.css';




/* class Popup extends React.Component {
    render() {
        return (
        <div className='popup'>
            <div className='popup_inner'>
            <h1>{this.props.text}</h1>
            <button onClick={this.props.closePopup}>close me</button>
            </div>
        </div>
        );
    }

    togglePopup() {
        this.setState({
        showPopup: !this.state.showPopup
        });
    }
}
 */
class Log extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        showPopup: false,
        email: "",
        password: "",
    };
}

handleChange = () => {
    this.setState({
        [event.target.name]: event.target.value,
    });
    
}

handleSubmit = () => {
    event.preventDefault();

    //je vérifie que le login existe et je récupère le token
    axios.post('http://www.o-courses.eu/api/user/login' , ({user : this.state }))
        .then(res => { console.log('reponses', res);
        //Je mets le token dans le localStorage
        localStorage.setItem('cool-jwt', res.data.token);  
        })
        //Je décode le token
        const jwtD = jwtDecode((window.localStorage.getItem('cool-jwt')));
        const userId= jwtD._id;
        console.log('après decode:', jwtD, 'et id:', userId)
        console.log('on lance la requete axios getuser');
       //Je récupère les infos de mon user
        axios.get(`http://www.o-courses.eu/api/user/getuser/${userId}`)
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
       // je redirige vers la page d'accueil
       this.props.history.push('/');  
    })
    

}

    render() {
        return (
           
         
            <div className='logContainer'>
                <h1>Se connecter</h1>
            <img className="img-log" src={Logo}></img> 
            <br></br>
            <Input
                name="email"
                type="email"
                className="ui input"
                placeholder="E-mail"
                value={this.state.value}
                onChange={(event) => this.handleChange()}
            />
            <Input
                name="password"
                type="password"
                className="ui input"
                placeholder="Mot de Passe"
                value={this.state.value}
                onChange={(event) => this.handleChange()}
            />

            <form onSubmit={(event) => this.handleSubmit()}>
                <button type="submit" className="ui button">
                Se connecter
                </button>
                <button type="cancel" className="ui button">
                Annuler
                </button>
            </form>
            <br></br>
            <small>Comment ? Vous n'avez pas encore de compte ?</small>
            <NavLink to="/signup" id="navlink">▶ ▶ ▶ Créez un compte ici ◀ ◀ ◀</NavLink>
            </div>

        );
    }
};


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
  const LogContainer = connectionStrategies(Log);
  
  // Étape 3 : on exporte le composant connecté qui a été généré
  export default withRouter(LogContainer);


