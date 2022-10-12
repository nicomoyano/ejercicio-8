import { ACTIONS } from '../actions/actions';

export const filterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FILTER: {
      return action.payload.filter;
    }
    default:
      return state;
  }
};
