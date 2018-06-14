import React, { Component } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  modificaMensagem,
  enviarMensagem,
  conversaUsuarioFetch
} from './../actions/AppActions.js';

class Conversa extends Component {
  componentWillMount() {
    this.props.conversaUsuarioFetch(this.props.contatoEmail);
    this.fonteDeDados = this.props.conversa.reverse(); //empty array
  }

  componentWillReceiveProps(nextProps) {
    this.fonteDeDados = nextProps.conversa.reverse(); //array with data
  }

  _enviarMensagem() {
    const { mensagem, contatoNome, contatoEmail } = this.props;
    if (mensagem !== '') this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
  }

  renderRow({ item: texto }) {
    if (texto.tipo === 'e') {
      return (
        <View style={{ alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40 }}>
          <Text 
            style={{
              fontSize: 18,
              color: '#000',
              padding: 10,
              backgroundColor: '#dbf5b4',
              elevation: 1
            }}
          >{texto.mensagem}</Text>
        </View>
      );
    }

    return (
      <View style={{ alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40 }}>
        <Text 
          style={{
            fontSize: 18,
            color: '#000',
            padding: 10,
            backgroundColor: '#f7f7f7',
            elevation: 1
          }}
        >{texto.mensagem}</Text>
      </View>
    );
  }

  render() {
    return (
      /* eslint-disable global-require */
      <View style={{ flex: 1, backgroundColor: '#eee4d5', padding: 10 }}>
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <FlatList
            inverted
            data={this.fonteDeDados}
            renderItem={this.renderRow}
          />
        </View>
        <View style={{ flexDirection: 'row', height: 60 }}>
          <TextInput
            style={{ flex: 4, backgroundColor: '#fff', fontSize: 18 }}
            value={this.props.mensagem}
            onChangeText={(text) => this.props.modificaMensagem(text)}
          />
          <TouchableHighlight
            onPress={() => this._enviarMensagem()}
            underlayColor="#fff"
          >
            <Image source={require('./../imgs/enviar_mensagem.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const conversa = _.map(state.ListaConversaReducer, 
                          (val, uid) => ({ ...val, uid })
                        ); //payload: snapshot.val()
  return ({
    conversa,
    mensagem: state.AppReducer.mensagem
  });
};

const mapActionCreators = {
  modificaMensagem,
  enviarMensagem,
  conversaUsuarioFetch
};

export default connect(mapStateToProps, mapActionCreators)(Conversa);
