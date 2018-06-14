import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';

import {
  modificaAdicionaContatoEmail,
  adicionaContato
} from './../actions/AppActions.js';

class AdicionarContato extends Component {
  renderAdicionarContato() {
    if (!this.props.adiciona_contato_ok) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              placeholder="E-mail"
              style={{ fontSize: 20, height: 45 }}
              onChangeText={(text) => this.props.modificaAdicionaContatoEmail(text)}
              value={this.props.adiciona_contato_email}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Adicionar"
              color="#115e54"
              onPress={() => this.props.adicionaContato(this.props.adiciona_contato_email)}
            />
            <Text style={{ color: '#f00', fontSize: 20 }}>
              {this.props.adiciona_contato_txt_erro}
            </Text>
          </View>
        </View>
      );
    }
    
    return (
      <View>
        <Text style={{ fontSize: 20 }}>Cadastro realizado com sucesso!</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        { this.renderAdicionarContato() }
      </View>
    );
  }
}

const mapStateToProps = (state) => (
  {
    adiciona_contato_email: state.AppReducer.adiciona_contato_email,
    adiciona_contato_txt_erro: state.AppReducer.adiciona_contato_txt_erro,
    adiciona_contato_ok: state.AppReducer.adiciona_contato_ok  
  }
);

const mapActionCreators = {
  modificaAdicionaContatoEmail,
  adicionaContato
};

export default connect(mapStateToProps, mapActionCreators)(AdicionarContato);
