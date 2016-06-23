/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

class harmful extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'Great Pacific Garbage Patch',
        'Duopoly on Political Power',
        'Rising Income Inequality',
        'Women\'s Leadership Gap',
        'Hard to Understand New Laws',
        'Broken Healthcare System',
      ]),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          HARMFUL
        </Text>
        <ListView style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.row}>{rowData}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontFamily: 'Arial',
    fontWeight: '900',
    fontSize: 20,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  list: {
    alignSelf: 'stretch',
  },
  row: {
    height: 70,
    fontSize: 16,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
  },
});

AppRegistry.registerComponent('harmful', () => harmful);
