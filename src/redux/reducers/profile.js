import { SET_PROFILE } from "../actions/actionTypes";

const INITIAL_STATE = {
  name: "",
  photoUrl: "",
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        name: action.payload.name,
        photoUrl: action.payload.photoUrl,
      };
    default:
      return state;
  }
};
export default profileReducer;
