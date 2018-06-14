import React, { Component } from 'react';
import { View, Text, TextInput, Button, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import {
  modificaNome,
  modificaEmail,
  modificaSenha,
  cadastraUsuario
} from './../actions/AutenticacaoActions.js';

class FormCadastro extends Component {

  _cadastraUsuario() {
    const { nome, email, senha } = this.props;
    this.props.cadastraUsuario({ nome, email, senha });
  }

  renderBtnCadastro() {
    if (this.props.loading_cadastro) {
      return (<ActivityIndicator size="large" />);
    }
    return (
      <Button
        color="#115e54"
        title="Cadastrar"
        onPress={() => this._cadastraUsuario()}
      />
    );
  }

  render() {
    /* eslint-disable global-require */
    return (
      <ImageBackground style={{ flex: 1, width: null }} source={require('./../imgs/bg.png')}>
        <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <TextInput
              style={{ fontSize: 20, height: 45 }}
              placeholder="Nome"
              placeholderTextColor="#fff"
              value={this.props.nome}
              onChangeText={(text) => this.props.modificaNome(text)}
            />
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

            <Text style={{ color: '#f00', fontSize: 18 }}>{this.props.erroCadastro}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {this.renderBtnCadastro()}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => (
  {
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroCadastro: state.AutenticacaoReducer.erroCadastro,
    loading_cadastro: state.AutenticacaoReducer.loading_cadastro
  }
);

const mapActionCreators = {
  modificaNome,
  modificaEmail,
  modificaSenha,
  cadastraUsuario
};

export default connect(mapStateToProps, mapActionCreators)(FormCadastro);
