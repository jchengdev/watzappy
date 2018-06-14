import React from 'react';
import { View, Text, Image, StatusBar, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { habilitaInclusaoContato } from './../actions/AppActions.js';

const TabBarMenu = (props) => (
  /* eslint-disable global-require */
  <View style={{ backgroundColor: '#115e54', elevation: 4, marginBottom: 6 }}>
    <StatusBar backgroundColor="#114d44" />

    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20, marginLeft: 20 }}>Watzapp Clone</Text>
      </View>
      <View style={{ flexDirection: 'row', marginRight: 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: 50 }}>
          <TouchableHighlight
            onPress={() => {
              Actions.addContato();
              props.habilitaInclusaoContato();
            }}
            underlayColor="#114d44"
          >
            <Image source={require('./../imgs/adicionar-contato.png')} />
          </TouchableHighlight>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <TouchableHighlight
            onPress={() => firebase.auth().signOut().then(() => Actions.boasVindas())}
            underlayColor="#114d44"
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>Sair</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    
    <TabBar {...props} style={{ backgroundColor: '#115e54', elevation: 0 }} />
  </View>
);

const mapActionCreators = {
  habilitaInclusaoContato
};

export default connect(null, mapActionCreators)(TabBarMenu);
