import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import { contatosUsuarioFetch } from './../actions/AppActions.js';

class Contatos extends Component {
  componentWillMount() {
    this.props.contatosUsuarioFetch();
    this.criaFonteDeDados(this.props.contatos); //empty array
  }

  componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados(nextProps.contatos); //array with data
  }

  criaFonteDeDados(contatos) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.fonteDeDados = ds.cloneWithRows(contatos);
  }

  renderRow(contato) {
    return (
      <TouchableHighlight
        onPress={() => Actions.conversa({
          contatoNome: contato.nome,
          contatoEmail: contato.email,
          title: contato.nome
        })}
      >
        <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: '#ccc' }}>
          <Text style={{ fontSize: 25 }}>{contato.nome}</Text>
          <Text style={{ fontSize: 18 }}>{contato.email}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.fonteDeDados}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const contatos = _.map(state.ListaContatosReducer, 
                          (val, uid) => ({ ...val, uid })
                        ); //payload: snapshot.val()
  return { contatos };
};

const mapActionCreators = {
  contatosUsuarioFetch
};

export default connect(mapStateToProps, mapActionCreators)(Contatos);
