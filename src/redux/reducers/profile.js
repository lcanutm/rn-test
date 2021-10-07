import { SET_PROFILE } from "../actions/actionTypes";

const INITIAL_STATE = {
  name: "",
  photoUrl: "",
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE:
      let name = action.payload.name;
      let photoUrl = action.payload.photoUrl;
      return {
        ...state,
        name,
        photoUrl,
      };
    default:
      return state;
  }
};
export default profileReducer;
