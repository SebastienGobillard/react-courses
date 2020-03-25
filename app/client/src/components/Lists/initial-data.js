
const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: '- Cette liste est vide pour le moment!'},
    'task-2': { id: 'task-2', content: "C'est l'occasion pour vous d'aller en créer une :) !"},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Ca donne la pêche !',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Vous pourrez même indiquer le titre que vous voulez ici! ',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-2', 'column-1'],
};

export default initialData;