import AsyncStorage from '@react-native-async-storage/async-storage';

import {DESTROY_SESSION} from '../actions/actionTypes';
import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import profileReducer from '../reducers/profile';

const appReducer = combineReducers({
  profile: profileReducer,
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) {
    AsyncStorage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['profile'],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {store, persistor};
