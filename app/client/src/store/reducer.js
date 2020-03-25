import axios from "axios";

export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const SIDE_EFFECT = 'SIDE_EFFECT';

const initialState = {
  isConnected: false,
  itemList: [],
  itemsIds: [],
  allIds: [],
  newItem: {},
  rackList: [],
  favItems: [],
  connectedUser: {
    name: "",
    surname: "",
    email: "",
    favlist: [],
  }
};

const defaultAction = {};

const reducer = (state = initialState, action = defaultAction) => {
  switch (action.type) {
    case UPDATE_INPUT_VALUE: {
      return {
        ...state,
        greetingMessage: action.value
      }
    }
    case 'USER_CONNECTED': {
      console.log('dans connected user reception:', action.value)
      let newIsConnected = action.value.connected;
      let newConnectedUser = action.value.user;
      let newFavItems = action.value.favlist;

      
      return {
        ...state,
        isConnected: newIsConnected,
        favItems: newFavItems,
        connectedUser: { ...state.connectedUser, 
                        name: newConnectedUser.name,
                        surname: newConnectedUser.surname, 
                        email: newConnectedUser.email},
      
    }
    };
    break;
    //soucis qui apparaissait au premier chargement de la page (rackList.push is not a function) résolu grâce au break
    case 'NEW_RACK': {
      let newRackList = state.rackList.push(action.value);
      return {
        ...state,
        rackList: newRackList
      }
    }
    //Gestion de la suppression d'un tâche 
    case 'DELETE_ITEM': {
      let updatedItemList = state.itemList;
      console.log('suppression item id:', action.value.id);
      for (let i=0; i <= updatedItemList.length -1; i++) {
        console.log("dans le for de delete_item");
          if(updatedItemList[i].id == action.value.id){
            console.log("item identique trouvé", updatedItemList[i])
            console.log("test d'un filter sur rack", action.value.rack)
            //Je veux descendre mon item list en regardant combien d'items ont le même rayon que celui que j'ai suprrimé
            let rackNumber = updatedItemList.filter(item => item.rack == action.value.rack).length;
            console.log('nombre d\'item avec le même rayon')
            updatedItemList.splice(i, 1);
          }
        }
      console.log("itemsOnListe suite suppression: ", updatedItemList, 'et rackList', state.rackList);
      
      // console.log('tableau après suppression :',updatedTasks);
      return {
        ...state,
        itemsOnList: updatedItemList,
        
      }
    }
    case 'CLEAR_LIST_LOGOUT': {
      return {
        itemList: [],
        rackList: []
      }
    }
    case 'ADD_ITEM_TO_LIST': {
      console.log('add idem, recu : ', action.value)
      let updatedItemList = state.itemList;
      updatedItemList.push(action.value);
      console.log("itemList suite ajout: ", updatedItemList, 'rackList', state.rackList);
      let newRackList = state.rackList.slice();
      if(newRackList.filter( name => name == action.value.rack).length>0 ) {
        console.log('le rayon existe');                
        } else {  
    console.log('le rayon n\'existe pas');
    newRackList.push(action.value.rack);       
}
    let updatedItemsIds = state.itemsIds;
    updatedItemsIds.push(action.value.id);
    updatedItemsIds[action.value.id] = action.value;
    let newAllIds = state.allIds;
    newAllIds.push(action.value.id)
      console.log("sortie du if de verif de rack",updatedItemList, updatedItemsIds);
      return {
        ...state,
        itemList: updatedItemList,
        rackList: newRackList,
        itemsIds: updatedItemsIds,
        allIds: newAllIds,
        newItem: {}
      }
    }
    case "CLICK_FAV" : {
      console.log('click fav value', action.value, 'user', action.value.user, 'favlist', action.value.favlist)
      //Je récupère la liste des items pour mettre à jour leur propriété fav
      let updatedItemList = state.itemList;
      console.log('dans reducer action CLICK_FAV');
      for (let i=0; i <= updatedItemList.length -1; i++) {
        console.log("dans le for de click_fav");
          if(updatedItemList[i].id == action.value.item){
            console.log("item identique trouvé", updatedItemList[i])
            console.log(updatedItemList[i].fav);
            updatedItemList[i].fav = !updatedItemList[i].fav;
            console.log('suite maj: updatedItemList:', updatedItemList)
          }
        }
        

        let newFavList = updatedItemList.filter(item => item.fav === true)

        /**TODO
         * Faire en sorte que deux favoris ne puisse pas avoir le même nom et si on ajoute un article qui à le même nom qu'un favori, griser l'étoile
         */
        console.log('suite filter nouveaux favoris :', newFavList);
        axios.post(`http://www.o-courses.eu/api/user/favlist/${action.value.user}`, {favlist: newFavList})
        // .then(res => console.log(res.body))

      return {
        ...state,
        itemsOnList: updatedItemList,
        favItems: newFavList,       
      }
    }

    case "ITEM_SHOPPED" :{
      let updatedItemList = state.itemList;
      console.log('dans reducer action Item shopped');
      for (let i=0; i <= updatedItemList.length -1; i++) {
        console.log("dans le for de item shopped");
          if(updatedItemList[i].id == action.value){
            console.log("item identique trouvé", updatedItemList[i])
            console.log(updatedItemList[i].fav);
            updatedItemList[i].shopped = !updatedItemList[i].shopped;
            console.log('suite maj: updatedItemList:', updatedItemList)
          }
        }
        return {
          ...state,
          itemsOnList: updatedItemList,
        }
    }

    case 'LOAD_LIST_DETAILS' : {
      console.log('dans charge list' , action.value)

      return {
        ...state,
        itemList: action.value.products,
        rackList: action.value.racks,
      }
    }
    case 'ERASE_LIST' : {
      return{
        ...state,
        itemList: [],
        rackList: []
      }
    }
    case 'DELETE_FROM_DB':{
      console.log('dans le reducer')
      axios.post(`http://www.o-courses.eu/api/user/remove-list/${action.value}`)
    }
    default: {
      // return state;
      // Dans le cas où on ne comprend pas quelle est l'action à
      // effecture (action.type n'est pas reconnu), on retourne
      // une copie non-altérée du state courant, reçu en paramètre.
      return { ...state };
    }
  }
};

export default reducer;

export const updateInputValue = value => {
  return {
    type: UPDATE_INPUT_VALUE,
    value
  };
};

export const sideEffect = () => ({ type: SIDE_EFFECT });
