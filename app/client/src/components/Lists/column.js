import React from 'react';
import styled from 'styled-components';
import Task from './task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

//Import local
import Supprimer from './supprimer.png';



const Contain = styled.div`
width: 68%;
margin: 1rem auto;

`;

const Container = styled.div`

  margin-top: 20px;
  border-radius: 12px;
  background-color: #FFF;
  box-shadow: 4px 4px 6px #D7D7D7;
  padding:1 rem;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;

  `;
const Title = styled.h3`
  display: flex;
  justify-content: space-between;
  align-item: center;
  padding: 8px;
  background-color: #F2F2F2;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-family: 'Open Sans';
  font-weight: bold;
  font-size: 0.8rem;
  margin: 0.2rem 0rem 0.2rem 0rem;
  `;
const TaskList = styled.div`
padding: 1rem;
font-family: 'Open Sans';
flex-grow: 1;
min-height: 50px;
`;

class Column extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }

  deleteList = (id) => {
    console.log('click pour supprimer', id);
    axios.post(`http://www.o-courses.eu/api/user/remove`)
    // this.props.deleteFromDB(id);
  }
  render() {
    return (
      <Contain>
      
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
      {(provided) => (
      <Container {...provided.draggableProps} ref={provided.innerRef}>
       <Title {...provided.dragHandleProps}>
         <span onClick={ () => { 
         axios.get(`http://www.o-courses.eu/api/user/findlist/${this.props.column.id}`)
         .then(res => {
           console.log('voila la réponse products', res.data.products, 'et racks', res.data.racks);
           this.props.loadList(res.data.products, res.data.racks);
           this.props.history.push('/create-list')
         })
        }
       } className="list-title">{
          this.props.column.title}</span>
          <img onClick={() => this.deleteList(this.props.column.id)} className="delete" src={Supprimer}></img>
          </Title>
        <Droppable droppableId={this.props.column.id} type="task">
        {(provided) => (
        <TaskList 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          >
          {this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index}/>
          ))}
          {provided.placeholder}
        </TaskList>
        )}
      </Droppable>
      </Container>
      )}
      </Draggable>
      </Contain>
    );
}

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
      loadList : (products, racks) => {
          console.log('click sur une liste', products, racks),
          dispatch({type: 'LOAD_LIST_DETAILS', value : {products, racks}})
      },
      deleteFromDB: (listId) => {
        console.log('dans deleteFromDB')
        dispatch({ type: 'DELETE_FROM_DB', value: listId})
      }
    };
  },
);

// Étape 2 : on applique ces stratégies à un composant spécifique.
const ColumnContainer = connectionStrategies(Column);

// Étape 3 : on exporte le composant connecté qui a été généré
export default withRouter(ColumnContainer);