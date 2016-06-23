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
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

class harmful extends Component {

  constructor(props) {
    super(props);
    this._data = [
      'Great Pacific Garbage Patch',
      'Duopoly on Political Power',
      'Rising Income Inequality',
      'Women\'s Leadership Gap',
      'Hard to Understand New Laws',
      'Broken Healthcare System',
    ]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._data),
      newItemTitle: '',
      isNewItemVisible: false,
    };
  }

  _onDataArrived(newData) {
    this._data = [newData].concat(this._data)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data)
    })
  }

  pressComposeButton() {
    // make new item screen visible
    this.setState({isNewItemVisible: true})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarButton}></Text>
          <Text style={styles.title}>HARMFUL</Text>
          <TouchableHighlight underlayColor='white' onPress={() => this.pressComposeButton()}>
            <Text style={styles.toolbarButton}>+</Text>
          </TouchableHighlight>
        </View>
        { this.state.isNewItemVisible ?
          <View style={styles.newItem}>
            <TextInput
              style={styles.newItemTitle}
              onChangeText={(newItemTitle) => this.setState({newItemTitle})}
              value={this.state.newItemTitle}
              autoFocus
              placeholder={'New item...'}
              onSubmitEditing={() => {
                if (this.state.newItemTitle !== '') {
                  this._onDataArrived(this.state.newItemTitle)
                }
                this.setState({
                  newItemTitle: '',
                  isNewItemVisible: false,
                })
              }}
            />
          </View>
        : null }
        <ListView style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={function(rowData, sectionId, rowId) {
            if (Number(rowId) % 2) {
              return <Text style={styles.evenRow}>{rowData}</Text>
            }
            return <Text style={styles.row}>{rowData}</Text>
          }}
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
  toolbar: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontWeight: '900',
    fontSize: 20,
    flex: 1,
  },
  toolbarButton: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 30,
    lineHeight: 20,
    paddingTop: 5,
    color: '#4A90E2',
    width: 50,
    textAlign: 'center',
  },
  newItem: {
    height: 70,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: '#F8F8F8',
  },
  newItemTitle: {
    fontSize: 16,
    height: 40,
    borderWidth: 0,
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
  evenRow: {
    height: 70,
    fontSize: 16,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: '#F8F8F8',
  },
});

AppRegistry.registerComponent('harmful', () => harmful);
