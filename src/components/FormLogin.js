import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {
  modificaEmail,
  modificaSenha,
  autenticarUsuario
} from './../actions/AutenticacaoActions.js';

class formLogin extends Component {
  _autenticarUsuario() {
    const { email, senha } = this.props;
    this.props.autenticarUsuario({ email, senha });
  }

  renderBtnAcessar() {
    if (this.props.loading_login) {
      return (<ActivityIndicator size="large" />);
    }
    return (
      <Button
        color="#115e54"
        title="Acessar"
        onPress={() => this._autenticarUsuario()}
      />
    );
  }

  render() {
    return (
      /* eslint-disable global-require */
      <ImageBackground style={{ flex: 1, width: null }} source={require('./../imgs/bg.png')}>
        <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: '#fff' }}>Watzapp Clone</Text>
          </View>
          <View style={{ flex: 2 }}>
            <TextInput
              style={{ fontSize: 20, height: 45 }}
              placeholder="E-mail"
              placeholderTextColor="#fff"
              value={this.props.email}
              onChangeText={(text) => this.props.modificaEmail(text)}
            />
            <TextInput
              secureTextEntry
              style={{ fontSize: 20, height: 45 }}
              placeholder="Senha"
              placeholderTextColor="#fff"
              value={this.props.senha}
              onChangeText={(text) => this.props.modificaSenha(text)}
            />
            <Text style={{ color: '#f00', fontSize: 18 }}>{this.props.erroLogin}</Text>
            <TouchableHighlight
              onPress={() => { Actions.formCadastro(); }}
            >
              <Text
                style={{ fontSize: 20, color: '#fff' }}
              >Ainda não tem cadastro? Cadastre-se</Text>
            </TouchableHighlight>
          </View>
          <View style={{ flex: 2 }}>
            {this.renderBtnAcessar()}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => (
  {
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroLogin: state.AutenticacaoReducer.erroLogin,
    loading_login: state.AutenticacaoReducer.loading_login
  }
);

const mapActionCreators = {
  modificaEmail,
  modificaSenha,
  autenticarUsuario
};

export default connect(mapStateToProps, mapActionCreators)(formLogin);
