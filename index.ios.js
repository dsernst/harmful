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
      {
        title: 'Great Pacific Garbage Patch',
        description: 'fooooobarrrr',
        people: [],
      },
      {
        title: 'Duopoly on Political Power',
        description:
`Only two candidates with a chance of winning. Never effective to run an independent candidate.They're almost always very similar ideologically. Both business candidates.

Founding father's warnings against a two-party system: http://www.washingtonsblog.com/2011/07/the-founding-fathers-tried-to-warn-us-about-the-threat-from-a-two-party-system.html

Helpful statements from Noam Chomsky on the subject: https://www.youtube.com/watch?v=QOudyiO238
`
        ,
        people: [],
      },
      {
        title: 'Rising Income Inequality',
        description: 'fooooobarrrr',
        people: [],
      },
      {
        title: 'Women\'s Leadership Gap',
        description: 'fooooobarrrr',
        people: [],
      },
      {
        title: 'Hard to Understand New Laws',
        description: 'fooooobarrrr',
        people: [],
      },
      {
        title: 'Broken Healthcare System',
        description: 'fooooobarrrr',
        people: [],
      },
    ]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._data),
      selectedTitle: this._data[1].title,
      selectedDescription: 'testvalue', // this._data[1].description,
      selectedIndex: 1,
    };
  }

  _onDataArrived(newData) {
    this._data = [newData].concat(this._data)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data)
    })
  }

  pressComposeButton() {
    // create new blank item and select it
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
        <ListView style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData, sectionId, rowId) => {
            var rowStyle = [styles.unselectedRow]
            if (Number(rowId) % 2) {
              rowStyle.push({backgroundColor: '#F8F8F8'})
            }
            if (Number(rowId) === this.state.selectedIndex) {
              rowStyle[0] = styles.selectedRow
              return (
                <View style={rowStyle}>
                  <TextInput
                    style={styles.selectedTitle}
                    onChangeText={(selectedTitle) => this.setState({selectedTitle})}
                    value={this.state.selectedTitle}
                    autoFocus
                    placeholder='New item...'
                    onSubmitEditing={() => this.refs.SelectedItemDescription.focus()}
                  />
                  <TextInput
                    ref="SelectedItemDescription"
                    style={styles.selectedDescription}
                    onChange={function(event) {
                      console.log('description height:', event.nativeEvent.contentSize.height)
                    }}
                    onChangeText={(selectedDescription) => {
                      console.log('this.state.selectedDescription:', this.state.selectedDescription)
                      console.log('arg to onChangeText:', selectedDescription)
                      this.setState({selectedDescription})}}
                    value={this.state.selectedDescription}
                    placeholder='Description...'
                    multiline
                    onSubmitEditing={() => {
                      if (this.state.selectedDescription !== '') {
                        this._onDataArrived(this.state.newItemDescription)
                      }
                    }}
                  />
                </View>
              )
            }
            return <Text style={rowStyle}>{rowData.title}</Text>
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
  list: {
    alignSelf: 'stretch',
  },
  unselectedRow: {
    height: 70,
    fontSize: 16,
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
  },
  selectedRow: {
    borderColor: 'grey',
    borderWidth: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingLeft: 10,
  },
  selectedTitle: {
    fontSize: 16,
    height: 40,
    borderWidth: 0,
  },
  selectedDescription: {
    fontSize: 14,
    height: 200,
    borderWidth: 0,
  },
});

AppRegistry.registerComponent('harmful', () => harmful);
