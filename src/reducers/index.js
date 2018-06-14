import { combineReducers } from 'redux';

import AutenticacaoReducer from './AutenticacaoReducer.js';
import AppReducer from './AppReducer.js';
import ListaContatosReducer from './ListaContatosReducer.js';
import ListaConversaReducer from './ListaConversaReducer.js';
import ListaConversasReducer from './ListaConversasReducer.js';

export default combineReducers({
  AutenticacaoReducer,
  AppReducer,
  ListaContatosReducer,
  ListaConversaReducer,
  ListaConversasReducer
});
