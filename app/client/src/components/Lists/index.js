import React from 'react';
import initialData from './initial-data';
import Column from './column';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import * as jwtDecode from 'jwt-decode';
import axios from 'axios';


//Local imports
import './lists.scss';
import './../App/App.css';

import Supprimer from './supprimer.png';
import Image from './oeuf.jpg';

const Contain = styled.div`
position: absolute; 
  height: 10px;
  left: 0;
  right: 0;
`

const Container = styled.div`
    padding-top: 20px;
  
  top: 50px;
  left: 0;
  right: 0;
  
`;


class Lists extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                initialData,
                listreceived: {},
                
            }
            if(window.localStorage.getItem('cool-jwt') === null){
                console.log('pas de jwt');
            } else {
                console.log('jwt detécté')
                let userId= jwtDecode((window.localStorage.getItem('cool-jwt')));
                // console.log(userId._id);
                axios.get(`http://www.o-courses.eu/api/user/getlist/${userId._id}`)
                .then(res => {
                    // console.log('réponses reçue',res.data.response, 'et les listes', );
                    this.setState({...this.state, initialData: res.data.response})
                })
      
            }
    }

    onDragEnd = result => {
        console.log('voila le result', result)
        const { destination, source, draggableId, type } = result;    
    
        if(!destination) {
            console.log('erreur de destination');
            return;
        }

        if (
            destination.droppableId === source.droppableId && destination.index === source.index
        ) {
            console.log('destination = source')
            return;
        }

        if(type === 'column') {
            console.log('j\'entre dans le if')
            const newColumnOrder = Array.from(this.state.initialData.columnOrder);
            console.log('splice 1')
            newColumnOrder.splice(source.index, 1);
            console.log('splice 2')
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state.initialData,
                columnOrder: newColumnOrder,
            };
            this.setState({...this.state, initialData: newState});
            return;
        }

        const column = this.state.initialData.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds,
        };

        const newState = {
            ...this.state.initialData,
            columns: {
                ...this.state.initialData.columns,
                [newColumn.id]: newColumn,            
            },
        };

        this.setState({...this.state, initialData : newState});
    };

    render() {
        console.log('voila le state', this.state);
        return (

            <Contain>
            <p className="path">▶ Accueil ▶ Listes</p>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable 
                    droppableId="all-columns" 
                    direction="vertical" 
                    type="column"
                >
                    
                {provided => (
                    <Container
                    
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    
                    {this.state.initialData.columnOrder.map((columnId, index) => {
                    const column = this.state.initialData.columns[columnId];
                    const tasks = column.taskIds.map(
                        taskId => this.state.initialData.tasks[taskId],
                    );

                    return (
                        <Column 
                            key={column.id} 
                            column={column} 
                            tasks={tasks} 
                            index={index}
                        />
                        );
                    })}
                    {provided.placeholder}
                    </Container>
                )}
                </Droppable>
            </DragDropContext>

            </Contain>
        );
        
    }
}

export default Lists;