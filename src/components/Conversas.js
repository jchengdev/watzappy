import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import {
  conversasUsuarioFetch
} from './../actions/AppActions.js';

class Conversas extends Component {
  componentWillMount() {
    this.props.conversasUsuarioFetch();
    this.criaFonteDeDados(this.props.conversas); //empty array
  }

  componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados(nextProps.conversas); //array with data
  }

  criaFonteDeDados(conversas) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.fonteDeDados = ds.cloneWithRows(conversas);
  }

  renderRow(conversa) {
    return (
      <TouchableHighlight
        onPress={() => Actions.conversa({
          contatoNome: conversa.nome,
          contatoEmail: conversa.email,
          title: conversa.nome
        })}
      >
        <View style={{ flex: 1, padding: 20, borderBottomWidth: 1, borderColor: '#ccc' }}>
          <Text style={{ fontSize: 25 }}>{conversa.nome}</Text>
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
  const conversas = _.map(state.ListaConversasReducer, 
                           (val, uid) => ({ ...val, uid })
                         ); //payload: snapshot.val()
  return { conversas };
};

const mapActionCreators = {
  conversasUsuarioFetch
};

export default connect(mapStateToProps, mapActionCreators)(Conversas);
