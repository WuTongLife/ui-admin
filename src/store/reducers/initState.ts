import { SAVE_CURRENT_USER } from "../actions/initState";

const initValue: Store.InitStateValue = {
  currentUser: undefined
};

export function initStateReducer(state = initValue, action: Store.InitStateAction) {
  switch (action.type) {
    case SAVE_CURRENT_USER:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
