import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import appReducer from './slices/app';
import authReducer from './slices/auth';
import chatReducer from './slices/chat';


const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  chat: chatReducer,
});

export { rootPersistConfig, rootReducer };