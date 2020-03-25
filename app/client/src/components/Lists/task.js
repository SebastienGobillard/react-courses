import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';


const Container = styled.div`
  
  width: 80%;
  border-bottom: 1px solid #eeeded;
  padding: 0.4em;
  border-radius: 12px;
  width: 100%;
  color: #B6B6B6;
  line-height: 1.5rem;
  background-color: white;
  `;

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
      {(provided) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
       {this.props.task.content}
       </Container>
      )}
      </Draggable>
    );
  }
}