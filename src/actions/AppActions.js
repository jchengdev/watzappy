import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';

import {
  MODIFICA_EMAIL_CONTATO,
  ADICIONANDO_CONTATO,
  ADICIONA_CONTATO_SUCESSO,
  ADICIONA_CONTATO_ERRO,
  LISTA_CONTATO_USUARIO,
  MODIFICA_MENSAGEM,
  ENVIA_MENSAGEM_SUCESSO,
  ENVIA_MENSAGEM_ERRO,
  LISTA_CONVERSA_USUARIO,
  LISTA_CONVERSAS_USUARIO
} from './types.js';

export const modificaAdicionaContatoEmail = (text) => ({
  type: MODIFICA_EMAIL_CONTATO,
  payload: text
});

export const adicionaContato = (email) => {
  const { currentUser } = firebase.auth(); //Object available after authentication
  const emailUsuarioB64 = b64.encode(currentUser.email);
  const emailB64 = b64.encode(email);

  return (dispatch) => {
    dispatch({ type: ADICIONANDO_CONTATO });

    firebase.database().ref(`/contatos/${emailB64}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          const dadosUsuario = _.first(_.values(snapshot.val()));

          firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .push({ email, nome: dadosUsuario.nome })
            .then(() => dispatch({ type: ADICIONA_CONTATO_SUCESSO, payload: true }));
            //.catch(err => dispatch({ type: ADICIONA_CONTATO_ERRO, payload: err.message }));
        } else {
          dispatch({
            type: ADICIONA_CONTATO_ERRO,
            payload: 'E-mail informado não corresponde a um usuário válido!'
          });
        }
      })
      .catch(err => dispatch({ type: ADICIONA_CONTATO_ERRO, payload: err.message }));
  };
};

export const habilitaInclusaoContato = () => ({
  type: ADICIONA_CONTATO_SUCESSO,
  payload: false
});

export const contatosUsuarioFetch = () => {
  const { currentUser } = firebase.auth(); //Object available after authentication
  const emailUsuarioB64 = b64.encode(currentUser.email);

  return (dispatch) => {  
    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
      .on('value', (snapshot) => {
        dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() });
      });
  };
};

export const modificaMensagem = (text) => ({
  type: MODIFICA_MENSAGEM,
  payload: text
});

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
  const { currentUser } = firebase.auth();
  const emailUsuarioB64 = b64.encode(currentUser.email);
  const emailContatoB64 = b64.encode(contatoEmail);

  return (dispatch) => {
    firebase.database().ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
      .push({ mensagem, tipo: 'e' })
      .then(() => {
        firebase.database().ref(`/mensagens/${emailContatoB64}/${emailUsuarioB64}`)
          .push({ mensagem, tipo: 'r' })
          .then(() => dispatch({ type: ENVIA_MENSAGEM_SUCESSO }));
      })
      .then(() => {
        firebase.database().ref(`/usuario_conversas/${emailUsuarioB64}/${emailContatoB64}`)
          .set({ nome: contatoNome, email: contatoEmail });
      })
      .then(() => {
        firebase.database().ref(`/contatos/${emailUsuarioB64}`)
          .once('value')
          .then((snapshot) => {
            if (snapshot.val()) {
              const dadosUsuario = _.first(_.values(snapshot.val()));
              firebase.database().ref(`/usuario_conversas/${emailContatoB64}/${emailUsuarioB64}`)
                .set({ nome: dadosUsuario.nome, email: currentUser.email });
            } //TODO: else case (empty search)
          });
      })
      .catch(err => dispatch({ type: ENVIA_MENSAGEM_ERRO, payload: err.message }));
  };
};

export const conversaUsuarioFetch = (contatoEmail) => {
  const { currentUser } = firebase.auth();
  const emailUsuarioB64 = b64.encode(currentUser.email);
  const emailContatoB64 = b64.encode(contatoEmail);

  return (dispatch) => {
    firebase.database().ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
      .on('value', (snapshot) => {
        dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() });
      });
  };
};

export const conversasUsuarioFetch = () => {
  const { currentUser } = firebase.auth();
  const emailUsuarioB64 = b64.encode(currentUser.email);

  return (dispatch) => {
    firebase.database().ref(`/usuario_conversas/${emailUsuarioB64}`)
      .on('value', (snapshot) => {
        dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() });
      });
  };
};
