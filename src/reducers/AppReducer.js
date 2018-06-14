import {
  MODIFICA_EMAIL_CONTATO,
  ADICIONANDO_CONTATO,
  ADICIONA_CONTATO_SUCESSO,
  ADICIONA_CONTATO_ERRO,
  MODIFICA_MENSAGEM,
  ENVIA_MENSAGEM_SUCESSO,
  ENVIA_MENSAGEM_ERRO
} from './../actions/types.js';

const INITIAL_STATE = {
  adiciona_contato_email: '',
  adiciona_contato_txt_erro: '',
  adiciona_contato_ok: false,
  mensagem: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_EMAIL_CONTATO:
      return { ...state, adiciona_contato_email: action.payload };
    case ADICIONANDO_CONTATO:
      return { ...state, adiciona_contato_txt_erro: '' };
    case ADICIONA_CONTATO_SUCESSO:
      return { ...state, adiciona_contato_ok: action.payload, adiciona_contato_email: '' };
    case ADICIONA_CONTATO_ERRO:
      return { ...state, adiciona_contato_txt_erro: action.payload };
    case MODIFICA_MENSAGEM:
      return { ...state, mensagem: action.payload };
    case ENVIA_MENSAGEM_SUCESSO:
      return { ...state, mensagem: '' };
    case ENVIA_MENSAGEM_ERRO:
      alert(`Erro: ${action.payload}`);
      return state;
    default:
      return state;
  }
};
