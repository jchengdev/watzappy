import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';

import {
  MODIFICA_NOME,
  MODIFICA_EMAIL,
  MODIFICA_SENHA,
  CADASTRO_USUARIO_SUCESSO,
  CADASTRO_USUARIO_ERRO,
  CADASTRO_EM_ANDAMENTO,
  LOGIN_USUARIO_SUCESSO,
  LOGIN_USUARIO_ERRO,
  LOGIN_EM_ANDAMENTO
} from './types.js';

export const modificaNome = (text) => ({
  type: MODIFICA_NOME,
  payload: text
});

export const modificaEmail = (text) => ({
  type: MODIFICA_EMAIL,
  payload: text
});

export const modificaSenha = (text) => ({
  type: MODIFICA_SENHA,
  payload: text
});

export const cadastraUsuario = ({ nome, email, senha }) => {
  const emailB64 = b64.encode(email);
  
  return (dispatch) => {
    dispatch({ type: CADASTRO_EM_ANDAMENTO });
    firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then(() => {
        firebase.database().ref(`/contatos/${emailB64}`)
        .push({ nome })
        .then(() => {        
          dispatch({ type: CADASTRO_USUARIO_SUCESSO });
          Actions.boasVindas();
        });
        //TODO: deal with auth() rollback if database() error
      })
      .catch(err => dispatch({ type: CADASTRO_USUARIO_ERRO, payload: err.message }));
  };
};

export const autenticarUsuario = ({ email, senha }) => 
  (dispatch) => {
    dispatch({ type: LOGIN_EM_ANDAMENTO });
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(() => {
        dispatch({ type: LOGIN_USUARIO_SUCESSO });
        Actions.principal();
      })
      .catch(err => dispatch({ type: LOGIN_USUARIO_ERRO, payload: err.message }));
  };
