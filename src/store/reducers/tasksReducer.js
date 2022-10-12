import { ACTIONS } from '../actions/actions';

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        ...state,
        {
          id: state.length,
          name: action.payload.name,
          completed: false,
        },
      ];
    case ACTIONS.DELETE:
      return state.filter((task) => task.id !== action.payload.id);
    case ACTIONS.TOGGLE:
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      });
    default:
      return state;
  }
};
