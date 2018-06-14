import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import FormCadastro from './components/FormCadastro.js';
import FormLogin from './components/FormLogin.js';
import BoasVindas from './components/BoasVindas.js';
import Principal from './components/Principal.js';
import AddContato from './components/AdicionarContato.js';
import Conversa from './components/Conversa.js';

export default () => (
  <Router navigationBarStyle={{ backgroundColor: '#115e54' }} titleStyle={{ color: '#fff' }}>
    <Stack key="root">
      <Scene key="formLogin" component={FormLogin} title="Login" hideNavBar />
      <Scene key="formCadastro" component={FormCadastro} title="Cadastro" hideNavBar={false} />
      <Scene key="boasVindas" component={BoasVindas} title="Bem-Vindo" initial hideNavBar />
      <Scene key="principal" component={Principal} title="Principal" hideNavBar />
      <Scene key="addContato" component={AddContato} title="Adicionar Contato" hideNavBar={false} />
      <Scene key="conversa" component={Conversa} title="Conversa" hideNavBar={false} />
    </Stack>
  </Router>
);
